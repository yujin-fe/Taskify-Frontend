import images from '@/assets/images';
import Title from '@/components/common/Title';

const pointStyle = 'text-[22px] font-medium text-gray-400';
const titleStyle =
  'mt-[60px] text-[36px] leading-[50px] text-gray-0 md:mt-[100px] md:text-[48px] md:leading-[64px]';
const listBaseStyle =
  'h-[686px] md:h-[972px] lg:h-[600px] flex flex-col justify-between items-center bg-gray-800 rounded-[8px] pt-[60px] md:pt-[63px] md:items-start lg:flex-row';

export default function HomeIntroSection() {
  return (
    <section className='mt-[80px] md:mt-[120px] lg:mt-[160px]'>
      <ul className='flex flex-col gap-[90px] text-center md:text-left'>
        <li className={`${listBaseStyle} md:pl-[60px] lg:pt-[103px]`}>
          <div className='shrink-0 lg:pt-[20px]'>
            <span className={pointStyle}>Point 1</span>
            <Title as='h3' weight={'bold'} className={titleStyle}>
              일의 <span className='text-gray-300'>우선순위</span>를
              <br />
              관리하세요
            </Title>
          </div>
          <img
            loading='lazy'
            src={images.serviceOverview1}
            className='ml-auto w-[520px] pl-[47px] lg:ml-0 lg:h-[497px] lg:w-[594px]'
            alt='Taskify 대시보드 이미지'
          />
        </li>
        <li
          className={`${listBaseStyle} lg:justify-start lg:gap-[100px] lg:pt-[98px] lg:pl-[108px]`}>
          <div className='shrink-0 md:pl-[60px] lg:order-1 lg:pt-[25px] lg:pl-0'>
            <span className={pointStyle}>Point 2</span>
            <Title as='h3' weight={'bold'} className={titleStyle}>
              해야 <span className='text-gray-300'>할 일</span>을
              <br />
              등록하세요
            </Title>
          </div>
          <img
            loading='lazy'
            src={images.serviceOverview2}
            className='w-[360px] px-[60px] md:mx-auto md:px-0 lg:mx-0 lg:w-[436px]'
            alt='할일 생성 모달 이미지'
          />
        </li>
      </ul>
    </section>
  );
}
