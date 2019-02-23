export const profileFields = [
  {
    name: 'handle',
    type: 'text',
    component: 'input',
    label: '* 개인 프로필 페이지 주소',
    placeholder: '예) CodeShin'
  },
  {
    name: 'status',
    type: 'text',
    component: 'input',
    label: '* 직업',
    placeholder: '예) 대학생, 개발자, 디자이너, 프리랜서 등...'
  },
  {
    name: 'company',
    type: 'text',
    component: 'input',
    label: '회사'
  },
  {
    name: 'website',
    type: 'text',
    component: 'input',
    label: '개인 웹사이트 주소'
  },
  {
    name: 'location',
    type: 'text',
    component: 'input',
    label: '거주지역'
  },
  {
    name: 'skills',
    type: 'text',
    component: 'input',
    placeholder: '예) Django,NodeJS,ReactJS,GraphQL',
    label: '*개발언어/기술스택, 스페이스 없이 쉼표로 구분해주세요'
  },
  {
    name: 'githubusername',
    type: 'text',
    component: 'input',
    label: '깃허브 아이디'
  },
  {
    name: 'bio',
    type: 'text',
    component: 'textarea',
    label: '자기소개'
  }
];

export const socialFields = [
  {
    prepend: true,
    icon: 'fab fa-facebook',
    name: 'facebook',
    type: 'text',
    component: 'input',
    placeholder: 'Facebook Page URL'
  },
  {
    prepend: true,
    icon: 'fab fa-twitter',
    name: 'twitter',
    type: 'text',
    component: 'input',
    placeholder: 'Twitter Page URL'
  },
  {
    prepend: true,
    icon: 'fab fa-instagram',
    name: 'instagram',
    type: 'text',
    component: 'input',
    placeholder: 'Instagram Page URL'
  },
  {
    prepend: true,
    icon: 'fab fa-linkedin',
    name: 'linkedin',
    type: 'text',
    component: 'input',
    placeholder: 'LinkIn Profile URL'
  },
  {
    prepend: true,
    icon: 'fab fa-youtube',
    name: 'youtube',
    type: 'text',
    component: 'input',
    placeholder: 'Youtube Page URL'
  }
];

export const experienceFields = [
  {
    name: 'title',
    type: 'text',
    component: 'input',
    label: '*직책',
    placeholder: '예) 주니어 개발자, 프론트엔드 개발자, 디자이너, 마케터'
  },
  {
    name: 'company',
    type: 'text',
    component: 'input',
    label: '*회사명'
  },
  {
    name: 'location',
    type: 'text',
    component: 'input',
    label: '지역'
  },
  {
    name: 'from',
    type: 'date',
    component: 'input',
    label: '*입사일'
  },
  {
    name: 'to',
    type: 'date',
    component: 'input',
    label: '퇴사일'
  },
  {
    name: 'current',
    type: 'checkbox',
    component: 'input',
    placeholder: '재직중'
  },
  {
    name: 'description',
    type: 'text',
    component: 'textarea',
    placeholder: '추가정보'
  }
];

export const educationFields = [
  {
    name: 'school',
    type: 'text',
    component: 'input',
    label: '*학교(학원)명'
  },
  {
    name: 'degree',
    type: 'text',
    component: 'input',
    label: '*학위(과정)명'
  },
  {
    name: 'fieldofstudy',
    type: 'text',
    component: 'input',
    label: '*전공분야'
  },
  {
    name: 'from',
    type: 'date',
    component: 'input',
    label: '*시작일'
  },
  {
    name: 'to',
    type: 'date',
    component: 'input',
    label: '종료일'
  },
  {
    name: 'current',
    type: 'checkbox',
    component: 'input',
    placeholder: '이수중'
  },
  {
    name: 'description',
    type: 'text',
    component: 'textarea',
    label: '추가정보'
  }
];
