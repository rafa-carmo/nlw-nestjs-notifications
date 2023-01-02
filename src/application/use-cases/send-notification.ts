import { Injectable } from '@nestjs/common'
import { Content } from '../entities/content'
import { Notification } from '../entities/notification'
import { NotificationsRepository } from '../repositories/notifications-repository'
interface SendNotificationsRequest {
  recipientId: string
  content: string
  category: string
}

interface SendNotificationResponse {
  notification: Notification
}

@Injectable()
export class SendNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: SendNotificationsRequest
  ): Promise<SendNotificationResponse> {
    const { recipientId, content, category } = request
    const notification = new Notification({
      recipientId,
      content: new Content(content),
      category,
      createAt: new Date(Date.now())
    })

    await this.notificationsRepository.create(notification)

    return { notification }
  }
}
