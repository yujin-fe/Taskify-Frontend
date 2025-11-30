import { useState } from 'react';
import Avatar from '@/components/common/avatar/Avatar';
import Button from '@/components/common/Button';
import ImageUpload from '@/components/common/ImageUpload';
import Input from '@/components/common/input/Input';
import Label from '@/components/common/Label';
import FormModal from '@/components/common/modal/FormModal';
import TextArea from '@/components/common/TextArea';
import Combobox from '@/components/dashboard/combobox/Combobox';
import TagInput from '@/components/dashboard-detail/modal/TagInput';
import { CREATE_CARD } from '@/constants/modalName';
import { useModal } from '@/hooks/useModal';
import type { Assignee, CardInitialValueType } from '@/types/card';
import type { MembersResponse } from '@/types/members';

interface CreateCardModalProps {
  memberData: MembersResponse;
  onSubmit: (formValue: CardInitialValueType, imageFile: File | null) => Promise<void>;
  serverErrorMessage: string | null;
}

const initialValue: CardInitialValueType = {
  assigneeUser: null,
  title: '',
  description: '',
  dueDate: '',
  tags: [],
  imageUrl: null,
};

export default function CreateCardModal({
  memberData,
  onSubmit,
  serverErrorMessage,
}: CreateCardModalProps) {
  const { handleModalClose } = useModal(CREATE_CARD);
  const [formValue, setFormValue] = useState(initialValue);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (key: keyof typeof initialValue) => (value: string | Assignee | null) => {
    setFormValue((prev) => ({ ...prev, [key]: value }));
  };

  const handleCardSubmit = async () => {
    try {
      await onSubmit(formValue, imageFile);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : '카드 생성 중 오류가 발생했습니다.';
      setErrorMessage(errorMsg);
    }
  };

  const isDisabled = formValue.title.trim() === '' || formValue.description.trim() === '';

  return (
    <FormModal modalName={CREATE_CARD}>
      <FormModal.Title title='할 일 생성' />
      <FormModal.Form onSubmit={handleCardSubmit}>
        <FormModal.Body>
          <div className='scrollbar-hidden scrollbar-thin-gray -mr-[10px] flex h-[calc(100dvh-450px)] flex-col gap-[32px] overflow-y-auto sm:mr-0 sm:max-h-[calc(100dvh-380px)]'>
            <div className='input-group-style'>
              <Label htmlFor='assigneeUserId' className='label-style'>
                담당자
              </Label>
              <Combobox
                id='assigneeUserId'
                value={formValue.assigneeUser}
                setValue={handleChange('assigneeUser')}>
                <Combobox.Trigger name='담당자' placeholder='이름을 입력해 주세요' />
                <Combobox.List>
                  {memberData.members.map((m) => (
                    <Combobox.Item key={m.id} value={m}>
                      <Avatar
                        size='s'
                        user={{
                          id: m.id,
                          userId: m.userId,
                          nickname: m.nickname,
                          profileImageUrl: m.profileImageUrl,
                        }}>
                        <Avatar.Img />
                        <Avatar.Fallback />
                      </Avatar>
                      <span className='font-medium'>{m.nickname}</span>
                    </Combobox.Item>
                  ))}
                </Combobox.List>
              </Combobox>
            </div>
            <Input value={formValue.title} onChange={handleChange('title')}>
              <Input.Label required className='label-style'>
                제목
              </Input.Label>
              <Input.Group>
                <Input.Field name='title' type='text' placeholder='제목을 입력해 주세요' />
              </Input.Group>
            </Input>
            <div className='input-group-style'>
              <Label htmlFor='desc' required className='label-style'>
                설명
              </Label>
              <TextArea
                id='desc'
                placeholder='설명을 입력해 주세요'
                value={formValue.description}
                onChange={handleChange('description')}
              />
            </div>
            <Input value={formValue.dueDate} onChange={handleChange('dueDate')}>
              <Input.Label className='label-style'>마감일</Input.Label>
              <Input.Group className='h-[48px]'>
                <Input.FieldDate placeholder='마감일을 선택해주세요' />
              </Input.Group>
            </Input>
            <div className='input-group-style'>
              <Label htmlFor='tags' className='label-style'>
                태그
              </Label>
              <TagInput
                tags={formValue.tags}
                setTags={(next: string[]) => setFormValue((prev) => ({ ...prev, tags: next }))}
              />
            </div>
            <div className='input-group-style'>
              <Label htmlFor='imageUrl' className='label-style'>
                이미지
              </Label>
              <ImageUpload file={imageFile} onFileChange={setImageFile} />
            </div>
          </div>
          {(serverErrorMessage || errorMessage) && (
            <span className='mt-[12px] inline-block font-md-medium text-error'>
              {serverErrorMessage || errorMessage}
            </span>
          )}
        </FormModal.Body>
        <FormModal.Footer className='pt-[32px]'>
          <Button theme={'outlined'} onClick={handleModalClose}>
            취소
          </Button>
          <Button disabled={isDisabled} theme={'primary'} type='submit'>
            생성
          </Button>
        </FormModal.Footer>
      </FormModal.Form>
    </FormModal>
  );
}
