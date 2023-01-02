import { makeNotification } from '@test/factories/notifcation-factory'
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository'
import { GetRecipientNotifications } from './get-recipient-notifications'

describe('Count recipient notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const countRecipientNotifications = new GetRecipientNotifications(
      notificationsRepository
    )

    await notificationsRepository.create(makeNotification())
    await notificationsRepository.create(makeNotification())
    await notificationsRepository.create(
      makeNotification({
        recipientId: 'another-id'
      })
    )

    const { notifications } = await countRecipientNotifications.execute({
      recipientId: 'recipient-to-test'
    })

    expect(notifications).toHaveLength(2)
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient-to-test' }),
        expect.objectContaining({ recipientId: 'recipient-to-test' })
      ])
    )
  })
})
