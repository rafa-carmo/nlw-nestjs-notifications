import { Content } from '@application/entities/content'
import {
  Notification,
  NotificationProps
} from '@application/entities/notification'

type Override = Partial<NotificationProps>

export function makeNotification(override: Override = {}) {
  return new Notification({
    category: 'test',
    content: new Content('Teste de conteudo'),
    recipientId: 'recipient-to-test',
    createAt: new Date(),
    ...override
  })
}
