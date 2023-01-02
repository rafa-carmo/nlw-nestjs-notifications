import { Notification as RawNotification } from '@prisma/client'
import { Notification } from '@application/entities/notification'
import { Content } from '@application/entities/content'

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      category: notification.category,
      content: notification.content.value,
      recipientId: notification.recipientId,
      readedAt: notification.readAt,
      createdAt: notification.createAt
    }
  }

  static toDomain(raw: RawNotification): Notification {
    return new Notification(
      {
        category: raw.category,
        content: new Content(raw.content),
        createAt: raw.createdAt,
        readAt: raw.readedAt,
        recipientId: raw.recipientId,
        canceledAt: raw.createdAt
      },
      raw.id
    )
  }
}
