import {queryParser} from '../common/queryParser.js';

$('[name="notificationSearchButton"]').on('click', () => {
  const userForm = $('[name="searchNotificationForm"]');
  const query = queryParser();
  const page = query.page;
  const range = query.range;

  userForm.find('[name="page"]').val(page);
  userForm.find('[name="range"]').val(range);

  userForm.submit();
});

