const fs = require("fs")
const path = require("path")
const { Notification } = require("../models/notification.model")

class NotificationRepository {
  constructor() {
    this.dataFile = path.join(__dirname, "../data/notifications.json")
    this.notifications = this.loadData()
  }

  loadData() {
    try {
      if (fs.existsSync(this.dataFile)) {
        const data = JSON.parse(fs.readFileSync(this.dataFile, "utf8"))
        return data.map((n) => new Notification(n))
      }
    } catch (error) {
      console.error("Error loading notifications data:", error)
    }
    return []
  }

  saveData() {
    try {
      const dir = path.dirname(this.dataFile)
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }
      fs.writeFileSync(this.dataFile, JSON.stringify(this.notifications, null, 2))
    } catch (error) {
      console.error("Error saving notifications data:", error)
    }
  }

  resolveReferences(notification) {
    // Import repositories here to avoid circular dependencies
    const userRepository = require("./user.repository")
    const matchRepository = require("./match.repository")

    const resolvedNotification = { ...notification }

    // Resolve user_id to user object
    if (notification.user_id) {
      const user = userRepository.findUserById(notification.user_id)
      resolvedNotification.user = user || null
    }

    // Resolve match_id to match object (if notification is match-related)
    if (notification.match_id) {
      const match = matchRepository.matches.find((m) => m.match_id === notification.match_id)
      resolvedNotification.match = match || null
    }

    return resolvedNotification
  }

  createNotification(data) {
    const newNotification = new Notification(data)
    this.notifications.push(newNotification)
    this.saveData()
    return newNotification
  }

  getNotifications() {
    return this.notifications.map((notification) => this.resolveReferences(notification))
  }

  getNotificationById(id) {
    const notification = this.notifications.find((n) => n.notification_id === id)
    return notification ? this.resolveReferences(notification) : null
  }

  updateNotification(id, updatedData) {
    const index = this.notifications.findIndex((n) => n.notification_id === id)
    if (index === -1) return null

    this.notifications[index] = { ...this.notifications[index], ...updatedData }
    this.saveData()
    return this.notifications[index]
  }

  deleteNotification(id) {
    const index = this.notifications.findIndex((n) => n.notification_id === id)
    if (index === -1) return null

    const deleted = this.notifications.splice(index, 1)[0]
    this.saveData()
    return deleted
  }
}

module.exports = new NotificationRepository()
