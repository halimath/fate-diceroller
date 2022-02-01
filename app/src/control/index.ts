import * as wecco from "@weccoframework/core"
import { GamemasterApi, PlayerCharacterApi } from "../api"
import { Home, Model, Notification, Scene } from "../models"
import { m } from "../utils/i18n"

export class ReplaceScene {
    readonly command = "replace-scene"

    constructor(public readonly scene: Scene) { }
}

export class PostNotification {
    readonly command = "post-notification"

    public readonly notifications: Array<Notification>

    constructor(...notifications: Array<Notification>) {
        this.notifications = notifications
    }
}

export class NewTable {
    readonly command = "new-table"

    constructor(public readonly title: string) { }
}

export class JoinTable {
    readonly command = "join-table"

    constructor(public readonly id: string, public readonly name: string) { }
}

export class UpdatePlayerFatePoints {
    readonly command = "update-fate-points"

    constructor(public readonly playerId: string, public readonly fatePoints: number) { }
}

export class SpendFatePoint {
    readonly command = "spend-fate-point"
}

export class AddAspect {
    readonly command = "add-aspect"

    constructor(public readonly name: string, public readonly targetPlayerId?: string) { }
}

export class RemoveAspect {
    readonly command = "remove-aspect"

    constructor(public readonly id: string) { }
}

export class TableClosed {
    readonly command = "table-closed"
}

export type Message = ReplaceScene |
    PostNotification |
    NewTable |
    JoinTable |
    UpdatePlayerFatePoints |
    SpendFatePoint |
    AddAspect |
    RemoveAspect |
    TableClosed

export class Controller {
    private api: GamemasterApi | PlayerCharacterApi | null = null

    async update(model: Model, message: Message, context: wecco.AppContext<Message>): Promise<Model | typeof wecco.NoModelChange> {
        switch (message.command) {
            case "replace-scene":
                return new Model(model.versionInfo, message.scene)

            case "post-notification":
                return new Model(model.versionInfo, model.scene, ...message.notifications)

            case "table-closed":
                return new Model(model.versionInfo, new Home(), new Notification(m("tableClosed.message")))

            case "new-table":
                this.api = await GamemasterApi.createGame(context, message.title)
                break

            case "join-table":
                this.api = await PlayerCharacterApi.joinGaim(context, message.id, message.name)
                break

            case "update-fate-points":
                if (this.api instanceof GamemasterApi) {
                    this.api.updateFatePoints(message.playerId, message.fatePoints)
                }
                break

            case "spend-fate-point":
                if (this.api instanceof PlayerCharacterApi) {
                    this.api.spendFatePoint()
                }
                break

            case "add-aspect":
                if (this.api instanceof GamemasterApi) {
                    this.api.addAspect(message.name, message.targetPlayerId)
                }
                break

            case "remove-aspect":
                if (this.api instanceof GamemasterApi) {
                    this.api.removeAspect(message.id)
                }
                break
        }

        return model.notifications.length === 0 ? wecco.NoModelChange : model.pruneNotifications()
    }
}
