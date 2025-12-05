import React, { createContext, useState, useEffect } from "react";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const STORAGE_KEY = "xen_notifications";

  const [notifications, setNotifications] = useState([]);

  // ---------------- LOAD FROM LOCAL STORAGE ----------------
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setNotifications(JSON.parse(saved));
    }
  }, []);

  // ---------------- SAVE TO LOCAL STORAGE ----------------
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
  }, [notifications]);

  // ---------------- ADMIN SENDS NOTIFICATION ----------------
  const sendNotification = (message) => {
    const newNote = {
      id: Date.now(),
      message,
      date: new Date().toLocaleString(),
      seen: false,
    };

    setNotifications((prev) => [newNote, ...prev]);
  };

  // ---------------- STUDENT MARKS AS SEEN ----------------
  const markAsSeen = (id) => {
    setNotifications((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, seen: true } : note
      )
    );
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        sendNotification,
        markAsSeen,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
