import {queryParser} from '../common/queryParser.js';
import {notificationValidation} from './notification-validation.js'


$('[name="notificationSearchButton"]').on('click', () => {
  const userForm = $('[name="searchNotificationForm"]');
  const query = queryParser();
  const page = query.page;
  const range = query.range;
  const receiverID = userForm.find('[name="receiverID"]').val();
  const senderID = userForm.find('[name="senderID"]').val();

  userForm.find('[name="page"]').val(page);
  userForm.find('[name="range"]').val(range);

  const notification = {
    receiverID: receiverID,
    senderID: senderID
  };

  if(notificationValidation(notification)){
    userForm.submit();
  } 
});

