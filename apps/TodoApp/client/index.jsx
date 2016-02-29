import { Accounts } from 'meteor/accounts-base';

import 'TodoApp/methods';

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});
