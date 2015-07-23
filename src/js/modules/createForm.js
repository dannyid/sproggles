export default () => {
  const REAL_FORM_ID = '2f33e21f-3324-437c-8bee-8cc266fc8296';
  const TEST_FORM_ID = '62052d58-3688-4528-81fc-102ea654df06';

  if (document.getElementsByClassName('hs-form').length === 0) {
    hbspt.forms.create({
      target: '#feedback-form',
      portalId: '150905',
      formId: TEST_FORM_ID
    });
  }
};
