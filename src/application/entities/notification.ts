import { randomUUID } from 'crypto'
import { Content } from './content'

export interface NotificationProps {
  recipientId: string
  content: Content
  category: string
  canceledAt?: Date | null
  readAt?: Date | null
  createAt: Date
}

export class Notification {
  private _id: string
  private props: NotificationProps

  constructor(props: NotificationProps, id?: string) {
    this._id = id ?? randomUUID()
    this.props = {
      ...props,
      createAt: props.createAt ?? new Date()
    }
  }

  public get id(): string {
    return this._id
  }
  public set recipientId(recipientId: string) {
    this.props.recipientId = recipientId
  }

  public get recipientId(): string {
    return this.props.recipientId
  }

  public set content(content: Content) {
    this.props.content = content
  }

  public get content(): Content {
    return this.props.content
  }

  public set category(category: string) {
    this.props.category = category
  }

  public get category(): string {
    return this.props.category
  }

  public cancel() {
    this.props.canceledAt = new Date()
  }

  public get canceledAt(): Date | null | undefined {
    return this.props.canceledAt
  }

  public read() {
    this.props.readAt = new Date()
  }
  public unread() {
    this.props.readAt = null
  }

  public get readAt(): Date | null | undefined {
    return this.props.readAt
  }

  public set createAt(createAt: Date) {
    this.props.createAt = createAt
  }

  public get createAt(): Date {
    return this.props.createAt
  }
}
