import { useEffect, useState } from "react";
import { database } from "../services/firebase";

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

export function useRooms(roomId: string){
    const [questions,setQuestions] = useState<QuestionType[]>([]); //<Question[]>
    const [title, setTitle] = useState('');

    useEffect(()=>{

        function buscaDadosTeste(){
         database.collection('rooms').doc(roomId).onSnapshot(snapshot =>{
             const room = snapshot.data();
             snapshot.ref.collection('question').get().then(questoes=>{
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
         
                 });   
                     
                 //console.log(qs);
                 setTitle((room as Room).title);
                 setQuestions(qs);
             });
 
         
         
         })
        }
 
 /*
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
 
        //buscaDados();
        buscaDadosTeste();
    },[roomId, questions])
 

    return {questions, title};
}