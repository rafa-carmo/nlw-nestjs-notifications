import { SendNotification } from './send-notification'

import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository'

describe('Send Notification', () => {
  it('Should be able to send a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const sendNotification = new SendNotification(notificationsRepository)

    await sendNotification.execute({
      category: 'Test',
      content: 'Test Notification',
      recipientId: '123'
    })

    expect(notificationsRepository.notifications).toHaveLength(1)
  })
})
