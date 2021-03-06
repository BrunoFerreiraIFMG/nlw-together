import { useEffect } from 'react';
import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import logoImg from '../assets/images/logo.svg';
import {Button} from '../components/Button';
import {Question} from  '../components/Question';
import {RoomCode} from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { useRooms } from '../hooks/useRooms';
import { database } from '../services/firebase';
import '../styles/rooms.scss';

type RoomParams ={
    id: string;
}

/*  //migrado para o useRooms
type Room ={
    authorId: string;
    title: string;
}

type Author ={
    name:string;
    avatar: string;
}

type QuestionType ={
    id:string;
    contente:string;
    isAnswered: boolean;
    isHighlithted: boolean;
    author: Author;
}
*/
export function AdminRoom(){

    const [newQuestion,setNewQuestion] = useState('');
    const params =useParams<RoomParams>();
    const roomId = params.id;
    const {title, questions} = useRooms(roomId);
    const user = useAuth();

    async function handleSendQuestion(event: FormEvent){

        event.preventDefault();
         if (newQuestion.trim() === ''){
             return;
         }

         if (!user){
            throw new Error('You must be logged in') 
         }

         const question = {
             contente: newQuestion,
             author: {
                 name: user.user?.name,
                 avatar: user.user?.avatar

             },
             isHighlithted: false,
             isAnswered: false,
         }

         await database.collection('rooms').doc(roomId).collection('question').add(question);

         setNewQuestion('');
    }

    return (
        <div id="page-room">
          <header>
              <div className="content">
                  <img src={logoImg} alt="LetmeAsk" />
                  <div>
                     <RoomCode code={params.id}/>
                     <Button isOutlined>Encerrar sala</Button>
                  </div>
                  
              </div>
          </header>

          <main>
             <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && 
                          <span> {questions.length} pergunta(s)</span>}
             </div>

           <div className="question-list"
                style={{width: '100%'}}>
              {questions.map(q => {
                return (
                    <Question key={q.id} 
                              content={q.contente}
                              author={q.author} />
                )

              })}
            </div>
            

          </main>
        </div>

        
    )
}

/*    //vers??o de buscar os dados sem o snapshot
       async function buscaDados(){

        const roomRef = await database.collection('rooms').doc(roomId).get();
        if (!roomRef)
           return;
        const room = roomRef.data();
        //console.log('++++>'+JSON.stringify(roomRef.data()));
        const questoes = await roomRef.ref.collection('question').get();
        const qs: QuestionType[] = [];
        questoes.forEach(q => {

            qs.push({
                id: q.id,
                contente:q.data().contente,
                isAnswered: q.data().isAnswered,
                isHighlithted: q.data().isHighlithted,
                author : {
                    name: q.data().author.name,
                    avatar: q.data().author.avatar
            }});
                //console.log(q.id,'=>',q.data().author.name);    
                //console.log(q.id,'=>',q.data());
        });   
            
        //console.log(qs);
        setTitle((room as Room).title);
        setQuestions(qs);
       }*/

