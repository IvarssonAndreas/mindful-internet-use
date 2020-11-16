import createInputList from '../components/createInputList';
import createDefaultList from '../components/createDefaultList';
import createTimerList from '../components/createTimerList';
import createGeneralSwitch from '../components/createGeneralSwitch';
import createNavigation from '../components/createNavigation';
import setUpGoogleAnalytics from "../analytics"
import selectList from "../components/selectNumBreath"


setUpGoogleAnalytics("/stop")

try {
    const timerListDanger = createTimerList('timerListDanger', 'DANGER');
    const timerListRest = createTimerList('timerListRest', 'REST');
    const numBreathSelector = selectList("numBreathSelector")

    const dangerURLs = createInputList('danger-list', 'dangerList');

    const userDangerReminders = createInputList(
        'reminders-user-danger',
        'userRemindersDanger'
    );

    const userRestReminders = createInputList(
        'reminders-user-rest',
        'userRemindersRest'
    );

    const switchDangerReminder = createGeneralSwitch(
        'switch-danger-reminder',
        'reminder-container-danger',
        'dangerReminderSwitch'
    );
    const switchRestReminder = createGeneralSwitch(
        'switch-rest-reminder',
        'reminder-container-rest',
        'restReminderSwitch'
    );

    const switchDefaultQoutes = createGeneralSwitch(
        'switch-danger-default-quotes',
        'danger-default-quotes-container',
        undefined
    );

    const dangerDefaultQuotes = createDefaultList(
        'danger-default-quotes',
        'defaultQuotes',
        switchDefaultQoutes
    );

    switchDefaultQoutes.setCallback(dangerDefaultQuotes.setAll);

    const switchDangerDefaultReminders = createGeneralSwitch(
        'switch-danger-default-reminders',
        'switch-danger-default-reminders',
        undefined
    );

    const defaultDangerReminders = createDefaultList(
        'reminders-default-danger',
        'defaultRemindersDanger',
        switchDangerDefaultReminders
    );

    switchDangerDefaultReminders.setCallback(defaultDangerReminders.setAll);

    const switchRestDefaultReminders = createGeneralSwitch(
        'switch-rest-default-reminders',
        'switch-rest-default-reminders',
        undefined
    );

    const defaultRestReminders = createDefaultList(
        'reminders-default-rest',
        'defaultRemindersRest',
        switchRestDefaultReminders
    );

    switchRestDefaultReminders.setCallback(defaultRestReminders.setAll);

    const dangerUserQuotes = createInputList('danger-user-quotes', 'userQuotes');

    const copySwitch = createGeneralSwitch(
        'copy-switch',
        'copy-switch-container',
        'copy'
    );

    const navigation = createNavigation(
        'navigation',
        [
            {
                section: 'danger',
                text: 'Mindless websites',
            },
            {
                section: 'default-list',
                text: 'Motivational quotes',
            },
            {
                section: 'reminder_content',
                text: 'Reminders',
            },
        ],
        'img/logoBlue128.png'
    );
} catch
    (e) {
    console.error(e);
}
