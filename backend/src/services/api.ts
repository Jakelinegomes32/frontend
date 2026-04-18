const API_URL = import.meta.env.VITE_API_URL

export const sendMessageAPI = async (message: string) => {
    const res = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
    })

    return res.json()
}