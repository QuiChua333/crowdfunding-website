import classNames from "classnames/bind";
import styles from './Comment.module.scss'
import InputComment from "~/components/Comments/InputComment";
import Comments from "~/components/Comments/Comment";
const cx = classNames.bind(styles)
function CommentSection({ campaign, comments, setListComments }) {
    return (
        <div className={cx('wrapper')}>
            <div>
                <InputComment setListComments={setListComments}/>
            </div>
            <div className={cx('comment-wrapper')}>
                <Comments campaign={campaign} comments={comments} setListComments={setListComments}/>
            </div>
        </div>
    );
}

export default CommentSection;