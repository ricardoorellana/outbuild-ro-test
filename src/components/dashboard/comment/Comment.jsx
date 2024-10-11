import styles from './Comment.module.css';

const Comment = ({ id, name, email, body }) => {
  return (
    <div className={styles.container}>
      <p>{id}</p>
      <p>{name}</p>
      <p>{email}</p>
      <p>{body}</p>
    </div>
  )
}

export default Comment;