import Icons from '@/assets/icons';

export default function HomeFooter() {
  return (
    <footer className='flex w-full max-w-[1640px] flex-col items-center justify-between gap-[12px] pt-[50px] pb-[100px] text-gray-400 md:h-[100px] md:flex-row md:p-0'>
      <span>©FE 19기 7팀 - 2025</span>
      <div className='flex gap-[16px] md:gap-[24px] lg:gap-[40px]'>
        <a
          href='https://github.com/orgs/sprint-19-part3-7team/discussions'
          target='_blank'
          rel='noreferrer'>
          Team-Discussions
        </a>
        <a
          href='https://github.com/sprint-19-part3-7team/Taskify-Frontend/discussions'
          target='_blank'
          rel='noreferrer'>
          Project-Discussions
        </a>
        <a
          href='https://github.com/sprint-19-part3-7team/Taskify-Frontend/wiki'
          target='_blank'
          rel='noreferrer'>
          Wiki
        </a>
      </div>
      <div className='mt-[36px] flex justify-end gap-[16px] md:mt-0 md:basis-[145px]'>
        {/* TODO: 시연 영상 제작 후 링크 변경 */}
        <a
          href='https://www.youtube.com/'
          target='_blank'
          aria-label='시연영상 보러가기'
          rel='noreferrer'>
          <Icons.Youtube />
        </a>
        <a
          href='https://github.com/sprint-19-part3-7team/Taskify-Frontend'
          target='_blank'
          aria-label='github로 이동'
          rel='noreferrer'>
          <Icons.Github />
        </a>
        <a
          href='https://www.notion.so/ahahahahreum/2a75213dcd4c80bd8142fb52c74896ca?source=copy_link'
          target='_blank'
          aria-label='팀 notion으로 이동'
          rel='noreferrer'>
          <Icons.Notion />
        </a>
      </div>
    </footer>
  );
}
