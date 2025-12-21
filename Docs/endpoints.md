## **1. Authentication (Session-based)**

|Method|Endpoint|Description|Body|Response|
|---|---|---|---|---|
|POST|`/api/auth/register`|Create new user|`{email, password, confirmPassword, name, username}`|`{id, email, username, name}`|
|POST|`/api/auth/login`|Login user|`{email, password}`|`{id, email, username, name}`|
|POST|`/api/auth/logout`|Logout user|-|`{message: "Logged out"}`|

---

## **2. User Profile**

|Method|Endpoint|Description|Body|Response|
|---|---|---|---|---|
|GET|`/api/users/profile`|Get current user profile|-|`{id, email, username, name, createdAt}`|
|PUT|`/api/users/profile`|Update name/username|`{name, username}`|`{id, email, username, name, message: "Profile updated"}`|
|PUT|`/api/users/password`|Change password|`{currentPassword, newPassword}`|`{message: "Password updated"}`|

---

## **3. Folder Management**

|Method|Endpoint|Description|Body|Response|
|---|---|---|---|---|
|GET|`/api/folders`|Get all user folders|-|`[{id, name, totalCards, createdAt}]`|
|GET|`/api/folders/recent`|Get 3 last created folders|-|`[{id, name, totalCards, createdAt}]`|
|POST|`/api/folders`|Create new folder|`{name}`|`{id, name, totalCards, createdAt}`|
|PUT|`/api/folders/{folderId}`|Rename folder|`{name}`|`{id, name, totalCards, createdAt}`|
|DELETE|`/api/folders/{folderId}`|Delete folder|-|`{message}`|

---

## **4. Flashcard Management**

|Method|Endpoint|Description|Body|Response|
|---|---|---|---|---|
|GET|`/api/folders/{folderId}/cards`|Get folder cards|-|`[{id, frontText, backText}]`|
|POST|`/api/folders/{folderId}/cards`|Create flashcard|`{frontText, backText}`|`{id, frontText, backText}`|
|PUT|`/api/cards/{cardId}`|Update flashcard|`{frontText, backText}`|`{id, frontText, backText}`|
|DELETE|`/api/cards/{cardId}`|Delete flashcard|-|`{message}`|

---

## **5. Study System (Simplified)**

|Method|Endpoint|Description|Body|Response|
|---|---|---|---|---|
|POST|`/api/study/sessions`|Start study session|`{folderId}`|`{sessionId, cards: [{id, frontText, backText}], totalCards}`|
|POST|`/api/study/sessions/{sessionId}/end`|End session & save score|`{score}`|`{message: "Session saved"}`|

---

## **6. Study History**

|Method|Endpoint|Description|Body|Response|
|---|---|---|---|---|
|GET|`/api/study/sessions`|Get past study sessions|-|`[{date, score}]`|

---

## **7. Dashboard (Optional)**

| Method | Endpoint                  | Description           | Body | Response                                                                     |
| ------ | ------------------------- | --------------------- | ---- | ---------------------------------------------------------------------------- |
| GET    | `/api/dashboard/overview` | Get dashboard summary | -    | `{recentFolders: [], recentSessions: [], stats: {totalFolders, totalCards}}` |