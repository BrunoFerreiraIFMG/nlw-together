
import { Link } from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import { useHistory } from 'react-router';
import {Button} from '../components/Button';

import '../styles/auth.scss';
import { useAuth } from '../hooks/useAuth';
import { FormEvent } from 'react';
import { useState } from 'react';
import { database } from '../services/firebase';

export function NewRoom(){

    const {user, signInWithGoogle} = useAuth();
    const [newRoom,setNewRoom] = useState('');
    const history = useHistory();

    async function handleCreateNewRoom(event: FormEvent){
         event.preventDefault();

         if (newRoom.trim() === ''){
             return;
         }

         const record = await database.collection('rooms').add({
             title: newRoom,
             authorId: user?.id,

         });
         console.log(record.id);
         history.push(`/rooms/${record.id}`)  //.key
         //const roomRef = database.ref('rooms'); 
         //const firebaseRoom = await roomRef.push({
         //   title: newRoom,
         //   authorId: user?.id})


    }

    
    return(
        <div id="page-auth">
            <aside>
               <img src={illustrationImg} alt="Ilustração"/>
               <strong>Crie salas de Q&amp;A ao-vivo</strong>
               <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>

            <main>
                <div className="main-content">
                  <img src={logoImg} alt="Letmeask"/>
                  {/*<h1>{user?.name}</h1>*/}
                  <h2>Criar uma nova sala</h2>
                  <form onSubmit={handleCreateNewRoom}>
                      <input type="text" 
                             placeholder="Nome da sala"
                             onChange={event=> setNewRoom(event.target.value)}
                             value={newRoom}/>
                      <Button>
                         Criar a sala
                      </Button>       
                  </form>
                  <p>
                      Quer entrar em uma sala existente? 
                      <Link to="/">Clique aqui</Link>
                  </p>
                </div>

            </main>
        </div>
    )
}