import  React, {useEffect, useState} from 'react';
import { Container } from 'semantic-ui-react';
import './App.css';
import { BookShelf } from './templates/Books';
import { RegisterBook } from './templates/RegisterBook';

function App() {

  const [books, setBooks] = useState([])

  useEffect(()=>{
    fetch("/get_all_books")
    .then(res=> 
      res.json()
      .then(data=>{
        setBooks(data.books);
      }));
  },[]);

  console.log(books)
  return (
      <Container style={{marginTop: 40, marginLeft:40}}>
        <RegisterBook onUpdate={book=> setBooks(b => [...b, book])}/>
        <BookShelf books={books}/>
      </Container>
  );
}

export default App;