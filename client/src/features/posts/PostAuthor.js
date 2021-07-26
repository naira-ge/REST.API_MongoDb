import React from 'react'
import { useSelector } from 'react-redux'

export const PostAuthor = ({ userId }) => {
  const author = useSelector((state) =>
    state.user.find((user) => user.id === userId)
  )

  return <span> {author ? author.name : 'Unknown author'}</span>
}
