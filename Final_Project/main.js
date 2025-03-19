const colors = {
    GREEN: '#C2F37D',
    BLUE: '#7DE1F3',
    RED: '#F37D7D',
    YELLOW: '#F3DB7D',
    PURPLE: '#E77DF3',
};

const model = {
    notes: [],
    
    addNote(title, color, content) {
        const id = new Date().getTime();
        const isFavourite = false;
        
        const newNote = {id, title, color, content, isFavourite};
        
        
        this.notes.push(newNote);
        view.renderNotes(color, id);
        view.renderNotesCount(this.notes);
    },
    
    removeNote(noteId) {
        this.notes = this.notes.filter(note => note.id !== noteId);
        view.removeNoteById(noteId);
        view.showRemoved();
        view.renderNotesCount(this.notes);
    },
    
    toggleFavourite(noteId) {
        const favouriteNote = this.notes.find(note => note.id === noteId);
        favouriteNote.isFavourite = !favouriteNote.isFavourite;
        view.toggleFavourite(noteId);
    },
    
    showNoNotes(notes) {
        const messageBox = document.querySelector('.message-box');
        
        if (this.notes.length === 0) {
            messageBox.textContent = `У вас нет добавленных заметок!`;
            messageBox.style.color = 'darkred';
            messageBox.style.fontWeight = 500;
        }
    },
};

const view = {
    init() {
        const btn = document.querySelector('.add-note-btn');
        const noteTitle = document.getElementById('note-title');
        const noteContent = document.getElementById('note-content');
        const notesContainer = document.querySelector('.notesContainer');
        const colors = document.querySelector('.radio-list');
        let noteColor = '#F3DB7D';
        //добавление заметки
        btn.addEventListener('click', event => {
            event.preventDefault();
            const title = noteTitle.value;
            const content = noteContent.value;
    
            controller.addNote(title, noteColor, content);
            noteTitle.value = '';
            noteContent.value = '';
        });
        
        colors.addEventListener('click', event => {
            if (event.target.classList.contains('radio')) {
                noteColor = event.target.closest('.radio').value;
            }
        });
        
        notesContainer.addEventListener('click', event => {
            const noteId = +event.target.closest('.new-note').getAttribute('data-id');
            if (event.target.classList.contains('trash')) {
                controller.removeNote(noteId);
            };
            if (event.target.classList.contains('heart')) {
                controller.toggleFavourite(noteId);
            }
        });
    },
    
    showNoNotes (notes) {
        controller.showNoNotes(notes);
    },

    renderNotes(color, id) {
        const notesContainer = document.querySelector('.notesContainer');
        
        const noteTitle = document.getElementById('note-title').value;
        const noteText = document.getElementById('note-content').value;

        const noteElement = document.createElement('div');
        noteElement.classList.add('new-note');
        noteElement.setAttribute('data-id', id);

        const noteHeader = document.createElement('div');
        noteHeader.classList.add('new-note-header');
        
        noteHeader.style.backgroundColor = color;
        noteHeader.textContent = `${new Date().toLocaleDateString()} ${noteTitle}`;

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
    
    removeNoteById (id) {
        const currentNote = document.querySelector(`[data-id="${id}"].new-note`);
        if (currentNote){
            currentNote.remove();
        };
    },
    
    toggleFavourite(noteId) {
        const noteElement = document.querySelector(`.new-note[data-id="${noteId}"]`);
        const heartIcon = noteElement.querySelector('.heart');
        
        if (heartIcon.src.includes('heart_inactive.svg')) {
            heartIcon.src = 'assets/heart_active.svg';
        } else {
            heartIcon.src = 'assets/heart_inactive.svg';
        }
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
    },
    
    showRemoved () {
        const messageBox = document.querySelector('.message-box');
    
        messageBox.innerHTML = `<img src="assets/message_Removed.svg" alt=""/>`;
        setTimeout(() => messageBox.innerHTML = '', 3000);
    }
};

const controller = {
    addNote(title, color, content) {
        const savedTitle = title;
        const savedContent = content;
        
        if (title.trim().length > 15) {
            view.showError();
            setTimeout(() => {
                document.getElementById('note-title').value = savedTitle;
                document.getElementById('note-content').value = savedContent;
            }, 0);
        } else if (!title || title.trim() === '' || !content || content.trim() === '') {
            view.showNotFilled();
            setTimeout(() => {
                document.getElementById('note-title').value = savedTitle;
                document.getElementById('note-content').value = savedContent;
            }, 0);
        } else {
            model.addNote(title, color,content);
            view.showDone();
    
            document.getElementById('note-title').value = '';
            document.getElementById('note-content').value = '';
        }
    },
    
    renderNotesCount(notes) {
        model.renderNotesCount(notes);
    },
    
    showNoNotes(notes) {
        model.showNoNotes(notes);
    },
    
    removeNote(noteId) {
        model.removeNote(noteId);
    },
    
    toggleFavourite(noteId) {
        model.toggleFavourite(noteId);
    }
    
};

view.init();
view.showNoNotes(model.notes);