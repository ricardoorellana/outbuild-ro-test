import { useEffect, useState, useContext } from 'react';
import styles from './Dashboard.module.css';
import CommentList from 'components/dashboard/comment/CommentList';
import Comment from 'components/dashboard/comment/Comment';
import Modal from 'components/common/modal';
import { useNavigate } from 'react-router-dom';
import { AuthContext  } from 'context/AuthContext';
import { fetchComments } from 'services/commentService';

const Dashboard = () => {
  const { user, deleteSession } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [selectedComment, setSelectedComment] = useState({});
  const [displayModal, setDisplayModal] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect (() => {
    if (!user) {
      navigate('/');
    }
  }, [navigate, user])

  useEffect(() => {
    const getComments = async () => {
      try {
        const comments = await fetchComments();
        setComments(comments);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching comments');
      } finally {
        setLoading(false);
      }
    };

    getComments();
  }, []);

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  const handleIconClick = (comment) => {
    setDisplayModal(true);
    setSelectedComment(comment);
  }

  const handleModalCloseClick = () => {
    setDisplayModal(false);
  }

  const handleLogoutClick = () => {
    deleteSession();
  }

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>ProDashboard</h2>
        <button className={styles.logoutButton} onClick={handleLogoutClick}>Logout</button>
      </div>

      <div className={styles.listContainer}>
        <CommentList comments={comments} onIconClick={handleIconClick} />
      </div>

      <Modal isVisible={displayModal} onClose={handleModalCloseClick}>
        <Comment {...selectedComment} />
      </Modal>
    </div>
  )
}

export default Dashboard;