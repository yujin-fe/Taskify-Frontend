import { cva, type VariantProps } from 'class-variance-authority';

const DashboardContainerStyles = cva('w-full rounded-md bg-gray-0', {
  variants: {
    type: {
      // 구성원
      Members:
        'px-[20px] pt-[22px] pb-[16px] sm:px-[28px] sm:pt-[26px] sm:pb-[20px] lg:h-[440px] lg:w-[620px]',
      // 초대 내역
      Invites:
        'px-[20px] pt-[24px] pb-[12px] sm:px-[28px] sm:pt-[32px] sm:pb-[20px] lg:h-[447px] lg:w-[620px]',
      // 프로필
      Profile: 'p-[16px] sm:rounded-xl sm:p-[24px] lg:h-[366px] lg:w-[672px]',
      // 비밀번호 변경
      ChangePassword: 'p-[16px] sm:rounded-xl sm:p-[24px]',
      // 대시보드 이름 수정(대시보드 수정)
      EditDashboardName:
        'px-[16px] py-[20px] sm:rounded-xl sm:px-[28px] sm:py-[32px] lg:h-[344px] lg:w-[620px]',
      // 초대받은 대시보드
      InvitedDashboards:
        'px-[20px] pt-[24px] pb-[80px] sm:rounded-xl sm:px-[40px] sm:pb-[120px] lg:h-[390px] lg:w-[960px]',
    },
  },

  defaultVariants: {
    type: 'Members',
  },
});

type DashboardContainerVariants = VariantProps<typeof DashboardContainerStyles>;

type DashboardContainerProps = {
  type?: DashboardContainerVariants['type'];

  children: React.ReactNode;
};

/**
 * DashboardContainer 컴포넌트
 *
 * 이 컴포넌트는 대시보드 테이블의 공통 레이아웃 뼈대를 제공합니다.
 * Top/Body 영역 컴포넌트를 넣어 사용하며, 스타일은 cva를 통해 type에 따라 적용됩니다.
 *
 * @example
 * <DashboardContainer type="Members">
 * <TableBody/>
 * </DashboardContainer>
 */

export default function DashboardContainer({
  type = 'Members',
  children,
}: DashboardContainerProps) {
  return <div className={DashboardContainerStyles({ type })}>{children}</div>;
}
