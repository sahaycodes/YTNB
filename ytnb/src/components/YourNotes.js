import React, {useState,useEffect} from 'react';
import './YourNotes.css';
import firebase from 'firebase/app';
import io from 'socket.io-client';

const socket=io('https://localhost:5000');

const YourNotes = () => {

    const [notes,setNotes]=useState([]);
    const [newNote , setNewNote]=useState('');
    const [editingIndex,setEditingIndex] = useState(-1);

    useEffect(()=>{
        socket.on('noteUpdate',(updatedNotes)=>{
            setNotes(updatedNotes);
        });
    });

    const handleNoteChange=(e) =>{
        setNewNote(e.target.value);
    };

    const addNote =() => {
        if (newNote.trim() !== ' '){
            if(editingIndex !== -1){
                const updatedNotes=[...notes];
                updatedNotes[editingIndex]={
                    note:newNote,
                    time: notes[editingIndex].time || new Date().toLocaleDateString(),
                };//updating existing notes
                setNotes(updatedNotes);
                setEditingIndex(-1);
            }else{
                setNotes([...notes,{note:newNote,time:new Date().toLocaleTimeString()}]);//adding new note , append notes
            }   
            setNewNote(''); 
        }
    };

    const editNote = (index) => {
        setNewNote(notes[index]);
        setEditingIndex(index);
    };

    const cancelEdit = () =>{
        setNewNote('');
        setEditingIndex(-1);
    };

    const deleteNote = (index) =>{
        const updatedNotes=notes.filter((note,i) => i !== index);
        setNotes(updatedNotes);
        setEditingIndex(-1);
    };

    useEffect(()=>{
        socket.emit('noteUpdate',notes);
    },[notes]);

    return(
        <div className='your-notes-container'>
            <h2>Your Notes</h2>
            <div className='note-form'>
                <input
                type="text"
                value={newNote}
                onChange={handleNoteChange}
                placeholder="Write your note..."
                />
                {editingIndex !== -1 ? (
                    <React.Fragment>
                        <button onClick={addNote} className="update-btn">Update Note</button>
                        <button onClick={cancelEdit} className='cancel-btn'>Cancel Edit</button>
                
                    </React.Fragment>
                ):(
                <button onClick={addNote} className='add-btn'>Add Notes</button>
                )}

                </div>
            {notes.length===0?(
                <p>No notes yet. Start taking notes!</p>
            ):(
                <ul className='note-list'>
                    {notes.map((note,index)=>(
                        <li key={index} className='note-item'>
                            {note.note}
                            <p>Created At: {note.time.toLocaleString()}</p>
                            <button onClick={() => editNote(index)} className='edit-btn'><i className='fas fa-pencil-alt'></i></button>
                            <button onClick={() => deleteNote(index)} className='delete-btn'><i className='fas fa-trash-alt'></i></button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export  {YourNotes} ;