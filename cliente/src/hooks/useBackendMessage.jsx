"use client"

import { useState, useEffect } from "react"
import axios from "axios"

export function useBackendMessage() {
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/hello-world`)
        setMessage(response.data.message || "No message received")
        setError(null)
      } catch (err) {
        console.error("Error fetching data:", err)
        setMessage("Failed to load backend message")
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchMessage()
  }, [])

  return { message, loading, error }
}
