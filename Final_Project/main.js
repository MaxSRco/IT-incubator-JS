const model = {
    notes: [],
    
    addNote(title, content) {
        const id = new Date().getTime();
        const isFavourite = false;
        const newNote = {id, title, content, isFavourite};
        
        this.notes.push(newNote);
        view.renderNotes(this.notes);
        view.renderNotesCount(this.notes);
        view.showDone();
    },
    
    showError() {
        view.showError();
    },
    
    showNotFilled() {
        view.showNotFilled();
    },
    
    showNoNotes(notes) {
        const messageBox = document.querySelector('.message-box');
        
        if (this.notes.length === 0) {
            messageBox.textContent = `У вас нет добавленных заметок!`;
            messageBox.style.color = 'darkred';
            messageBox.style.fontWeight = 500;
        }
    }
    
    // favouriteNote(favouriteId) {
    //     this.notes.forEach(note => {
    //         if (note.id === favouriteId) {
    //             const heartIcon = document.querySelector(`#${note.id} .heart`);
    //             heartIcon.setAttribute('src', 'assets/heart_active.svg');
    //         }
    //
    //     })
    //     return this.notes;
    // },
    
    // toggleFavourite(id) {
    //     this.notes = this.notes.map(note => {
    //         if (note.id === id) {
    //             note.isFavourite = !note.isFavourite;
    //         }
    //         return note;
    //     });
    // },
};

const view = {
    init() {
        // this.renderNotes(model.notes);

        const btn = document.querySelector('.add-note-btn');
        const noteTitle = document.getElementById('note-title');
        const noteContent = document.getElementById('note-content');
        const notesContainer = document.querySelector('.notesContainer');
        
        //добавление заметки
        btn.addEventListener('click', event => {
            event.preventDefault();
            const title = noteTitle.value;
            const content = noteContent.value;

            controller.addNote(title, content);
            noteTitle.value = '';
            noteContent.value = '';
            controller.renderNotesCount(notes);
        });
        //добавление заметки в избранное
        notesContainer.addEventListener('click', event => {
            if (event.target.classList.contains('heart')) {
                const favouriteId = +event.target.closest('.new-note').id;
                controller.favouriteNote(favouriteId);
            }
        })
    },
    
    showNoNotes (notes) {
        controller.showNoNotes(notes);
        // messageBox.textContent = `У вас нет еще ни одной заметки</br>
        //                         Заполните поля выше и создайте свою первую заметку!`;
    },

    renderNotes(notes) {
        const notesContainer = document.querySelector('.notesContainer');
        const noteTitle = document.getElementById('note-title').value;
        const noteText = document.getElementById('note-content').value;

        const noteElement = document.createElement('div');
        noteElement.classList.add('new-note');

        const noteHeader = document.createElement('div');
        noteHeader.classList.add('new-note-header');
        noteHeader.textContent = noteTitle;

        const noteTrash = document.createElement('span');
        noteTrash.classList.add('new-note-header-icons');
        noteTrash.innerHTML = `<img class="heart" src="assets/heart_inactive.svg" alt="" width="20" height="18">
                               <img class="trash" src="assets/trash.svg" alt="" width="20" height="20">
                                `;

        const noteContent = document.createElement('div');
        noteContent.classList.add('new-note-content');
        noteContent.textContent = noteText;

        noteHeader.appendChild(noteTrash);
        noteElement.appendChild(noteHeader);
        noteElement.appendChild(noteContent);
        notesContainer.prepend(noteElement);
    },
    
    renderNotesCount (notes) {
        const counter = document.querySelector('.counter');
        counter.textContent = notes.length;
    },
    
    showDone() {
        const messageBox = document.querySelector('.message-box');
        
        messageBox.innerHTML = `<img src="assets/Alert.svg" alt=""/>`;
        setTimeout(() => messageBox.innerHTML = '', 3000);
    },
    
    showError() {
        const messageBox = document.querySelector('.message-box');

        messageBox.innerHTML = `<img src="assets/message_Error.svg" alt=""/>`;
        setTimeout(() => messageBox.innerHTML = '', 3000);
    },
    
    showNotFilled () {
        const messageBox = document.querySelector('.message-box');
    
        messageBox.innerHTML = `<img src="assets/message_Not_filled.svg" alt=""/>`;
        setTimeout(() => messageBox.innerHTML = '', 3000);
    }
    
    
};

const controller = {
    addNote(title, content) {
        const savedTitle = title;
        const savedContent = content;
        
        if (title.trim().length > 15) {
            model.showError();
            setTimeout(() => {
                document.getElementById('note-title').value = savedTitle;
                document.getElementById('note-content').value = savedContent;
            }, 0);
        } else if (!title || title.trim() === '' || !content || content.trim() === '') {
            model.showNotFilled();
            setTimeout(() => {
                document.getElementById('note-title').value = savedTitle;
                document.getElementById('note-content').value = savedContent;
            }, 0);
        } else {
            model.addNote(title, content);
            document.getElementById('note-title').value = '';
            document.getElementById('note-content').value = '';
        }
    },
    
    renderNotesCount(notes) {
        model.renderNotesCount(notes);
    },
    
    showNoNotes(notes) {
        model.showNoNotes(notes);
    }
    
};

view.init();
view.showNoNotes(model.notes);