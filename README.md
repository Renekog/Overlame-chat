# Overlame-chat
Overlame chat
# Overlame-chat --- Unstable version.
Overlame chat
# Overlame v1.0 Extension 

Overlame v1.0 is a Chrome browser extension that provides a terminal-style overlay chat for any website. Users on the same website can chat in real-time, with messages persisting per domain as "ghost" memories. Presence is tracked with human-readable names and a live peer count.

## Features

- **Dockable Chat UI:** A resizable chat window that docks at the bottom or side of any page without reflowing or obscuring content. It has a retro terminal theme (green text on black background). 
- **Ghost Memory:** Chat history is stored per-domain. When you revisit a domain, previous messages appear as "ghosts" from past sessions. History resets when switching to a different domain.
- **Presence & Names:** Each user is assigned a fun codename (e.g., "WittyNeuron009"). The chat shows how many users are online and lists their nicknames. Presence updates occur in real-time.
- **Debug Panel:** A small debug box in the top-right corner shows live metrics (peer count, scroll percentage of the page, heartbeat pulses, connection status). Click it to toggle detailed view.
- **Matrix Connectivity:** The extension uses the Matrix network in the background to sync messages across different users (peers) as a fallback for peer-to-peer communication. No signup is required \'96 it uses anonymous guest access.
- **Multi-Tab Sync:** If you open multiple tabs on the same domain, they stay in sync through the extension (messages from one tab show up in the other).

## Installation

1. **Download the Extension:** Download the Overlame v1.0 ZIP package and extract it. You should have a folder containing the manifest and source files.
2. **Load in Chrome:** Open Chrome and navigate to `chrome://extensions`. Enable "Developer mode" (toggle in the top right corner). Click "Load unpacked" and select the extracted Overlame extension folder. The extension will install.
3. **Verify:** You should see the Overlame extension in your toolbar (a green chat icon). You may pin it for easy access.

## Usage

- **Open the Chat:** Navigate to any website. Click the Overlame extension icon (\uc0\u55357 \u56492 ) in the browser toolbar. The chat panel will appear docked at the bottom of the page.
- **Chatting:** Type a message in the input box and press Enter. Your message will broadcast to others on the *same domain*. If others have the extension active on that site, you'll see their messages appear.
- **Resizing & Docking:** Drag the chat panel\'92s header to resize (vertically when docked at bottom, horizontally when docked at side). Click the double-arrow button in the header to toggle docking the chat to the side of the screen or back to the bottom.
- **Closing:** To hide the chat, click the **\uc0\u10005 ** button in the chat header (or click the extension icon again). This will leave the chat on that page (you will no longer be listed as present).
- **Debug Info:** The small "Debug" box at the top-right shows technical info. By default it displays peer count, your scroll position (% down the page), heartbeat pulses, and connection status. This is primarily for development and can be ignored in normal use. You can click it to collapse or expand the detail.

## How It Works

Overlame creates a chat room per domain. When you activate the chat on a page, your extension joins that domain\'92s chat room (using an anonymous Matrix network identity in the background). Messages you send are shared with others via the Matrix network. If multiple users are on the same site, you'll see the peer count increase and their codenames appear. The extension periodically sends heartbeat \'93pulse\'94 signals to update presence and listens for incoming messages and presence updates from others.

All chat history is stored locally in your browser (per domain). When you revisit a domain and open the chat, you\'92ll see previous messages (ghost memory) even if no one is currently online. Each domain\'92s history is kept separate. (In a future version, a profile-wide archive may be available, but v1.0 focuses on per-site history.)

The Overlame Chat Explorer (at **overlame.chat**) can display your usage metrics. Open the website after using the extension to see a list of domains you've chatted on, total messages, unique peers encountered, and last active time. (This page reads data from the extension; it requires the extension to be installed and running.)

## Privacy

No sign-up or personal information is required. Codenames are generated randomly and are not linked to your identity. Messages are relayed through the Matrix network as a fallback for connectivity. Public Matrix rooms are used, meaning messages may briefly be stored on the Matrix server to distribute to peers, but rooms are ephemeral and identified only by domain name. The extension does not log your browsing activity \'96 it only knows the current domain to scope the chat. All persistent data (chat logs and metrics) are stored locally in your browser.

## Troubleshooting

- If the chat panel doesn\'92t open when you click the icon, make sure the extension is installed and enabled (check `chrome://extensions`).
- If you don\'92t see other users, it could be that no one else is on the same site at the same time, or they haven\'92t opened their chat panel. Try coordinating with a friend to test.
- The Matrix network requires internet access. If you\'92re offline or behind a strict firewall, the extension will still let you type messages (and store them locally), but others won\'92t receive them until connectivity is restored.
- To clear chat history for a domain, uninstall and reinstall the extension (this will reset all stored data). Domain-specific clearing can be done via Chrome's extension storage settings if needed.

## Contributing

This is version 1.0 of Overlame, based on the earlier v0.9.1 design and feature set. It\'92s an open-source project \'96 contributions and issue reports are welcome. For now, manual installation is required (as above). Future releases may be uploaded to the Chrome Web Store pending review.

Enjoy chatting across the web with Overlame!

