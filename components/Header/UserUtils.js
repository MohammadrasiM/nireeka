import CartQuickView from "../Atoms/shopping/CartQuickView";
import UserAvatar from "../Atoms/userProfile/UserAvatar";
import ComparisonHeaderButton from "../comparator/ComparisonHeaderButton";

const UserUtils = (props) => {
  return (
    <>
      <ComparisonHeaderButton fill={props.fill} className={props.iconClassName} />
      <CartQuickView fill={props.fill} className={props.iconClassName} />
      <UserAvatar className={props.avatarClassName} />
    </>
  );
};

export default UserUtils;
