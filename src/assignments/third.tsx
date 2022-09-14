/* 
Review following code snippet and answer questions: 
    1) What’s wrong with this code snippet? 
    2) How can we improve it? 
    3) Are there any cases when this code can be used with no modification? 
*/

/* 
Answers:
    1) React uses index as a key by default if key not provided, but it may lead to bugs if we change array(delete, add or sort elements)
    2) We can pass 'id' as a key
    3) Yes, if array does not change(etc. order), this work fine
*/

import type { FC } from 'react'

export interface Book {
  id: string
  name: string
}
export const BooksList: FC<{ books: Book[] }> = ({ books }) => {
  return (
    <ul>
      {books.map((book) => (
        <li key={book.id}>{book.name}</li>
      ))}
    </ul>
  )
}
