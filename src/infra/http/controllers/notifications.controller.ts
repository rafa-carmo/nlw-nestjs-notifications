import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common'
import { CreateNotificationBody } from '../dtos/create-notification-body'
import { SendNotification } from '@application/use-cases/send-notification'
import { NotificationViewModel } from '../view-models/notification-view-model'
import { CancelNotification } from '@application/use-cases/cancel-notification'
import { ReadNotification } from '@application/use-cases/read-notification'
import { UnreadNotification } from '@application/use-cases/unread-notification'
import { CountRecipientNotifications } from '@application/use-cases/count-recipient-notifications'
import { GetRecipientNotifications } from '../../../application/use-cases/get-recipient-notifications'

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipientNotifications: CountRecipientNotifications,
    private getRecipientNotifications: GetRecipientNotifications
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({
      notificationId: id
    })
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({
      notificationId: id
    })
  }
  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({
      notificationId: id
    })
  }

  @Get('/from/:recipientId')
  async getFromRecipient(@Param('recipientId') id: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId: id
    })
    return notifications.map(NotificationViewModel.toHttp)
  }

  @Get('/count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') id: string) {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId: id
    })
    return { count }
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, category, content } = body

    const { notification } = await this.sendNotification.execute({
      recipientId,
      category,
      content
    })
    return { notification: NotificationViewModel.toHttp(notification) }
  }
}
