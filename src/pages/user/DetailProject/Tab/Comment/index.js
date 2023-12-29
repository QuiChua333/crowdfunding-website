import classNames from "classnames/bind";
import styles from './Comment.module.scss'
import InputComment from "~/components/Comments/InputComment";
import Comments from "~/components/Comments/Comment";
import { useSelector } from "react-redux";
const cx = classNames.bind(styles)
function CommentSection({ campaign, comments, setListComments, members }) {
    const currentUser = useSelector(state => state.user.currentUser)
    return (
        <div className={cx('wrapper')}>
            {
                currentUser._id &&
                <div>
                    <InputComment setListComments={setListComments} />
                </div>
            }
            {
                comments.length > 0 &&
                <div className={cx('comment-wrapper')}>
                    <Comments campaign={campaign} comments={comments} setListComments={setListComments} members={members}/>
                </div>
            }
        </div>
    );
}

export default CommentSection;