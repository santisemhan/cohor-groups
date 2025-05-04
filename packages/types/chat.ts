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

export type Message = {
    id: string
    content: string
    // date: string
    sender?: {
        name: string
        imageUrl: string
    }
}