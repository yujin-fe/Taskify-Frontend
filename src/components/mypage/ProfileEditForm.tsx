import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from '@/components/common/Button';
import ImageUpload from '@/components/common/ImageUpload';
import Input from '@/components/common/input/Input';
import BaseModalFrame from '@/components/common/modal/BaseModalFrame';
import Title from '@/components/common/Title';
import DashboardBody from '@/components/dashboard/table/DashboardBody';
import DashboardContainer from '@/components/dashboard/table/DashboardContainer';
import DashboardHeader from '@/components/dashboard/table/DashboardHeader';
import useAuthForm from '@/hooks/useAuthForm';
import useBaseModal from '@/hooks/useBaseModal';
import useUserContext from '@/hooks/useUserContext';
import { changeUserMe, uploadImage } from '@/lib/apis/users';
import { uploadImageFile } from '@/utils/uploadImageFile';

const InitialValue: Record<'nickname', string> = {
  nickname: '',
};

interface ReqBody {
  nickname: string;
  profileImageUrl?: string | null;
}

export default function ProfileEditForm() {
  const { userProfile, setUserProfile } = useUserContext();
  const { authForm, setAuthForm, handleChange, handleBlur, error, disabled } =
    useAuthForm(InitialValue);
  const { isOpen, handleModalClose, handleModalOpen } = useBaseModal();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [defaultImageUrl, setDefaultImageUrl] = useState<string | null>(null);

  const [apiErrorMsg, setApiErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (userProfile) {
      setAuthForm({ nickname: userProfile.nickname ?? '' });
      setDefaultImageUrl(userProfile?.profileImageUrl);
    }
  }, [userProfile, setAuthForm]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // TODO: useMutation 훅 구현 시 적용
    e.preventDefault();

    const { nickname } = authForm;
    const reqbody: ReqBody = { nickname, profileImageUrl: defaultImageUrl };

    try {
      if (imageFile) {
        try {
          const resImage = await uploadImageFile({
            file: imageFile,
            requestFn: uploadImage,
          });

          reqbody.profileImageUrl = resImage?.profileImageUrl;
        } catch {
          setApiErrorMsg(`이미지 업로드 중\n오류가 발생했습니다.`);
          handleModalOpen();
          return;
        }
      }
      const updateProfile = await changeUserMe(reqbody);
      setUserProfile(updateProfile);
      setApiErrorMsg('');
      setSuccessMsg('유저 정보가\n업데이트 되었습니다.');
      handleModalOpen();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setSuccessMsg('');
        setApiErrorMsg(error.response?.data?.message ?? '오류가 발생했습니다.');
        handleModalOpen();
      }
    } finally {
      setImageFile(null);
    }
  };

  return (
    <>
      <DashboardContainer type={'Profile'}>
        <DashboardHeader>
          <Title as='h3' weight={'bold'} className='text-lg sm:text-2xl'>
            프로필
          </Title>
        </DashboardHeader>
        <DashboardBody className='mt-[40px] sm:mt-[24px]'>
          <form noValidate className='flex gap-[42px]' onSubmit={handleSubmit}>
            <ImageUpload
              defaultImageUrl={defaultImageUrl}
              setDefaultImageUrl={setDefaultImageUrl}
              file={imageFile}
              onFileChange={setImageFile}
              size='Large'
            />
            <div className='flex w-full flex-col gap-[16px]'>
              <Input disabled value={userProfile?.email || '이메일을 입력해 주세요.'}>
                <Input.Label className='mypage-label'>이메일</Input.Label>
                <Input.Group>
                  <Input.Field name='email' />
                </Input.Group>
              </Input>
              <Input
                value={authForm.nickname}
                onChange={handleChange('nickname')}
                onBlur={handleBlur('nickname')}
                error={!!error.nickname}>
                <Input.Label className='mypage-label'>닉네임</Input.Label>
                <Input.Group>
                  <Input.Field
                    name='nickname'
                    type='text'
                    placeholder='닉네임을 입력해 주세요'
                    autoComplete='off'
                  />
                </Input.Group>
                <Input.ErrorMessage>{error.nickname}</Input.ErrorMessage>
              </Input>
              <Button className='mt-[8px]' disabled={disabled} type='submit'>
                저장
              </Button>
            </div>
          </form>
        </DashboardBody>
      </DashboardContainer>
      {isOpen && (
        <BaseModalFrame setOnModal={() => handleModalClose()}>
          {
            <div className='break-words whitespace-pre-line sm:px-[60px]'>
              {apiErrorMsg || successMsg}
            </div>
          }
        </BaseModalFrame>
      )}
    </>
  );
}
