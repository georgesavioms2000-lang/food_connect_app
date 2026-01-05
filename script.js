document.addEventListener('DOMContentLoaded', () => {
    // Mock Data
    const users = [
        { id: 1, name: 'Alice', image: 'https://i.pravatar.cc/50?img=1', favoriteFood: 'Pizza' },
        { id: 2, name: 'Bob', image: 'https://i.pravatar.cc/50?img=2', favoriteFood: 'Sushi' },
        { id: 3, name: 'Charlie', image: 'https://i.pravatar.cc/50?img=3', favoriteFood: 'Tacos' },
    ];

    const posts = [
        { id: 1, author: 'Alice', image: 'https://i.picsum.photos/id/102/4320/3240.jpg?hmac=F_9_cCEfs1sakdRhI8ssg0Z0kImOKvONtrH6pWp9sxg', caption: 'Had a great time sharing this pizza!' },
        { id: 2, author: 'Bob', image: 'https://i.picsum.photos/id/103/2592/1936.jpg?hmac=aC1I-2_pNlJCsX3p1T-7bQ8MkV1YF41wIabFO_eT22s', caption: 'Sushi night with my new foodie friend!' },
    ];

    // DOM Elements
    const userList = document.getElementById('user-list');
    const chatMessages = document.getElementById('chat-messages');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const feedPosts = document.getElementById('feed-posts');
    const newPostBtn = document.getElementById('new-post-btn');
    const userProfileModal = document.getElementById('user-profile-modal');
    const newPostModal = document.getElementById('new-post-modal');
    const closeBtns = document.querySelectorAll('.close-btn');

    // Render Users
    function renderUsers() {
        userList.innerHTML = '';
        users.forEach(user => {
            const userItem = document.createElement('div');
            userItem.className = 'user-item';
            userItem.innerHTML = `<img src="${user.image}" alt="${user.name}"><span>${user.name}</span>`;
            userItem.addEventListener('click', () => openUserProfile(user));
            userList.appendChild(userItem);
        });
    }

    // Render Posts
    function renderPosts() {
        feedPosts.innerHTML = '';
        posts.forEach(post => {
            const postItem = document.createElement('div');
            postItem.className = 'post-item';
            postItem.innerHTML = `
                <p><strong>${post.author}</strong></p>
                <img src="${post.image}" alt="Food post">
                <p>${post.caption}</p>
            `;
            feedPosts.appendChild(postItem);
        });
    }

    // Open User Profile Modal
    function openUserProfile(user) {
        const userProfileContent = document.getElementById('user-profile-content');
        userProfileContent.innerHTML = `
            <img src="${user.image}" alt="${user.name}" style="width:100px;height:100px;border-radius:50%;">
            <h2>${user.name}</h2>
            <p><strong>Favorite Food:</strong> ${user.favoriteFood}</p>
        `;
        userProfileModal.style.display = 'block';
    }

    // Chat
    sendButton.addEventListener('click', () => {
        const message = messageInput.value;
        if (message.trim() !== '') {
            const messageElement = document.createElement('p');
            messageElement.textContent = `You: ${message}`;
            chatMessages.appendChild(messageElement);
            messageInput.value = '';
            // Simulate a reply
            setTimeout(() => {
                const replyElement = document.createElement('p');
                replyElement.textContent = `Friend: That sounds delicious!`;
                chatMessages.appendChild(replyElement);
            }, 1000);
        }
    });

    // New Post Modal
    newPostBtn.addEventListener('click', () => {
        newPostModal.style.display = 'block';
    });

    // Submit New Post
    const submitPostBtn = document.getElementById('submit-post-btn');
    submitPostBtn.addEventListener('click', () => {
        const caption = document.getElementById('post-caption').value;
        const newPost = {
            id: posts.length + 1,
            author: 'You',
            image: 'https://i.picsum.photos/id/1060/5598/3732.jpg?hmac=3210h2aW0Bbmקור-SgK1t4psM9iXAlW5g3gI03e2368', // Placeholder image
            caption: caption,
        };
        posts.unshift(newPost);
        renderPosts();
        newPostModal.style.display = 'none';
    });

    // Modal Closing
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            userProfileModal.style.display = 'none';
            newPostModal.style.display = 'none';
        });
    });

    window.addEventListener('click', (event) => {
        if (event.target == userProfileModal || event.target == newPostModal) {
            userProfileModal.style.display = 'none';
            newPostModal.style.display = 'none';
        }
    });

    // Initial Render
    renderUsers();
    renderPosts();
});
