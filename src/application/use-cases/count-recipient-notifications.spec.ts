import { makeNotification } from '@test/factories/notifcation-factory'
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository'
import { CountRecipientNotifications } from './count-recipient-notifications'

describe('Count recipient notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository
    )

    await notificationsRepository.create(makeNotification())
    await notificationsRepository.create(makeNotification())
    await notificationsRepository.create(
      makeNotification({ recipientId: 'teste2' })
    )

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient-to-test'
    })

    expect(count).toEqual(2)
    // await notificationsRepository.countManyByRecipientId('recipient-to-test')
  })
})
