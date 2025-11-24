import images from '@/assets/images';
import Title from '@/components/common/Title';

interface HomeServiceDetailCardProps {
  img: string;
  imgAlt: string;
  title: string;
  desc: string;
}

/** @internal HomeServiceDetailsSection 전용 카드 컴포넌트입니다. 외부에서 사용하지 마세요. */
function HomeServiceDetailCard({ img, imgAlt, title, desc }: HomeServiceDetailCardProps) {
  return (
    <li className='flex w-full max-w-[378px] flex-col'>
      <div className='flex h-[260px] items-center justify-center rounded-t-[8px] bg-gray-600 p-2'>
        <img className='w-full max-w-[300px]' src={img} alt={imgAlt} loading='lazy' />
      </div>
      <div className='rounded-b-[8px] bg-gray-800 px-[32px] py-[33px] text-gray-0'>
        <Title as='h4' weight={'bold'} size={'2lg'} className='mb-[18px] text-gray-0'>
          {title}
        </Title>
        <p>{desc}</p>
      </div>
    </li>
  );
}

const HOME_SERVICE_DETAILS_CARD_DATA: HomeServiceDetailCardProps[] = [
  {
    img: images.serviceCard1,

    imgAlt: '대시보드 설정 안내 이미지',
    title: '대시보드 설정',
    desc: '대시보드 사진과 이름을 변경할 수 있어요.',
  },
  {
    img: images.serviceCard2,

    imgAlt: '초대 안내 이미지',
    title: '초대',
    desc: '새로운 팀원을 초대할 수 있어요.',
  },
  {
    img: images.serviceCard3,

    imgAlt: '구성원 초대 안내 이미지',
    title: '구성원',
    desc: '구성원을 초대하고 내보낼 수 있어요.',
  },
];

export default function HomeServiceDetailsSection() {
  return (
    <section className='mt-[90px] mb-[160px]'>
      <Title
        as='h3'
        className='mb-[36px] text-center text-[22px] text-gray-0 md:text-[28px] lg:text-left'
        weight={'bold'}>
        생산성을 높이는 다양한 설정 ⚡
      </Title>
      <ul className='flex flex-col items-center gap-[32px] lg:flex-row lg:items-start'>
        {HOME_SERVICE_DETAILS_CARD_DATA.map((item) => (
          <HomeServiceDetailCard
            key={item.title}
            img={item.img}
            imgAlt={item.imgAlt}
            title={item.title}
            desc={item.desc}
          />
        ))}
      </ul>
    </section>
  );
}
