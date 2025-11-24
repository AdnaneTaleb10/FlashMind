# API Structure

Base URL: `/api/`

---
## **AUTHENTICATION ENDPOINTS**

| Method   | Endpoint             | Description             | Body                                                 | Response                  |
| -------- | -------------------- | ----------------------- | ---------------------------------------------------- | ------------------------- |
| **POST** | `/api/auth/register` | Create new user account | `{email, password, confirmPassword, name, username}` | `{user, token}`           |
| **POST** | `/api/auth/login`    | User login              | `{email, password}`                                  | `{user, token}`           |
| **POST** | `/api/auth/logout`   | End user session        | -                                                    | `{message: "Logged out"}` |

---
## ** DASHBOARD ENDPOINT**

|Method|Endpoint|Description|Response|
|---|---|---|---|
|**GET**|`/api/dashboard/overview`|Get dashboard data|`{recentFolders[], recentSessions[], stats{}}`|

---
## **USER MANAGEMENT ENDPOINTS**

### **Single Page - Multiple Update Operations**

| Method  | Endpoint              | Description               | Use Case                      | Body                             | Response                                     |
| ------- | --------------------- | ------------------------- | ----------------------------- | -------------------------------- | -------------------------------------------- |
| **GET** | `/api/users/profile`  | Get current user profile  | Load profile data for editing | -                                | `{userId, email, name, username, createdAt}` |
| **PUT** | `/api/users/profile`  | Update basic profile info | Change name or username       | `{name, username}`               | `{user, message: "Profile updated"}`         |
| **PUT** | `/api/users/password` | Change password           | Update password securely      | `{currentPassword, newPassword}` | `{message: "Password updated"}`              |

---
## **FOLDER MANAGEMENT ENDPOINTS**

| Method     | Endpoint                       | Description                | Body     | Response                                    |
| ---------- | ------------------------------ | -------------------------- | -------- | ------------------------------------------- |
| **GET**    | `/api/folders`                 | Get all user folders       | -        | `[{folderId, name, totalCards, createdAt}]` |
| **GET**    | `/api/folders/recent`          | Get 3 last created folders | -        | `[{folderId, name, totalCards, createdAt}]` |
| **GET**    | `/api/folders/search`          | Search folders by name     | -        | `[{folderId, name, totalCards}]`            |
| **POST**   | `/api/folders`                 | Create new folder          | `{name}` | `{folder}`                                  |
| **PUT**    | `/api/folders/:folderId`       | Rename folder              | `{name}` | `{folder}`                                  |
| **DELETE** | `/api/folders/:folderId`       | Delete folder              | -        | `{message}`                                 |
| **GET**    | `/api/folders/:folderId/stats` | Get folder statistics      | -        | `{totalCards, lastScore}`                   |

---
## **FLASHCARD MANAGEMENT ENDPOINTS**

| Method     | Endpoint                       | Description      | Body                    | Response    |
| ---------- | ------------------------------ | ---------------- | ----------------------- | ----------- |
| **GET**    | `/api/folders/:folderId/cards` | Get folder cards | -                       | `[{card}]`  |
| **POST**   | `/api/folders/:folderId/cards` | Create flashcard | `{frontText, backText}` | `{card}`    |
| **PUT**    | `/api/cards/:cardId`           | Update flashcard | `{frontText, backText}` | `{card}`    |
| **DELETE** | `/api/cards/:cardId`           | Delete flashcard | -                       | `{message}` |

---
## ** STUDY SESSION FLOW ENDPOINTS**

| Method   | Endpoint                                | Description                   | Headers                         | Body          | Response                                               |
| -------- | --------------------------------------- | ----------------------------- | ------------------------------- | ------------- | ------------------------------------------------------ |
| **POST** | `/api/study/sessions`                   | Start study session           | `Authorization: Bearer <token>` | `{folderId}`  | `{sessionId, currentCard, totalCards, cardsRemaining}` |
| **POST** | `/api/study/sessions/:sessionId/reveal` | Show answer for current card  | `Authorization: Bearer <token>` | -             | `{card, showAnswer: true}`                             |
| **POST** | `/api/study/sessions/:sessionId/answer` | Submit answer (correct/wrong) | `Authorization: Bearer <token>` | `{isCorrect}` | `{nextCard, cardsRemaining, sessionComplete}`          |
| **POST** | `/api/study/sessions/:sessionId/end`    | End session early             | `Authorization: Bearer <token>` | -             | `{sessionSummary}`                                     |