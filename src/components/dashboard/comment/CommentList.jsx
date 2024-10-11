import Input from 'components/common/input';
import Eye from 'assets/images/eye_closed_ic.png';

const DashboardCommentList = ({ comments, onIconClick }) => {
  if (!comments.length) {
    return null;
  }

  return (
    <>
      {comments.map(comment => (
        <Input
          id={comment.id}
          key={comment.id}
          value={`${comment.id} | ${comment.name} | ${comment.email}`}
          comment={comment}
          disabled={true}
          type='password'
          inputMode='password'
          icon={Eye}
          onIconClick={onIconClick}
        />
        ))}
    </>
  );
};

export default DashboardCommentList;