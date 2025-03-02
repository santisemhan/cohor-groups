export type ChatPreview = {
    id: string
    group: {
        name: string
        imageUrl: string
    }
    lastMessage?: {
        fromName: string
        content: string
        date: string
        viewed: boolean
    }
    recentMatch: boolean
}