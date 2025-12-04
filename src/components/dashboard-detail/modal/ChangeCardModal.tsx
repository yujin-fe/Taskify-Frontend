import { useMemo, useState } from 'react';
import Avatar from '@/components/common/avatar/Avatar';
import Button from '@/components/common/Button';
import ImageUpload from '@/components/common/ImageUpload';
import Input from '@/components/common/input/Input';
import Label from '@/components/common/Label';
import FormModal from '@/components/common/modal/FormModal';
import TextArea from '@/components/common/TextArea';
import Combobox, {
  type StatusComboboxValue,
  type UserComboboxValue,
} from '@/components/dashboard/combobox/Combobox';
import CardStatusBadge from '@/components/dashboard-detail/card/CardStatusBadge';
import TagInput from '@/components/dashboard-detail/modal/TagInput';
import { DUE_DATE, IMAGE_URL } from '@/constants/requestCardData';
import { useColumnListContext } from '@/hooks/useColumnListContext';
import { useModal } from '@/hooks/useModal';
import type { CardEditFormValue } from '@/types/card';
import type { MembersResponse } from '@/types/members';

interface ChangeCardModalProps {
  memberData: MembersResponse;
  modalName: string;
  initialValue: CardEditFormValue;
  serverErrorMessage: string | null;
  onSubmit: (formValue: CardEditFormValue, imageFile: File | null) => Promise<void>;
}

export default function ChangeCardModal({
  memberData,
  modalName,
  initialValue,
  serverErrorMessage,
  onSubmit,
}: ChangeCardModalProps) {
  const { handleModalClose } = useModal(modalName);
  const { columnList } = useColumnListContext();
  const [formValue, setFormValue] = useState(initialValue);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [defaultImageUrl, setDefaultImageUrl] = useState<string | null>(initialValue.imageUrl);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (key: keyof CardEditFormValue) => (value: string | null) => {
    setFormValue((prev) => ({ ...prev, [key]: value }));
  };

  const handleComboboxChange = (
    key: 'columnId' | 'assigneeUser',
    value: StatusComboboxValue | UserComboboxValue | null
  ) => {
    setFormValue((prev) => {
      if (key === 'columnId') {
        const newValue = value as StatusComboboxValue | null;
        return {
          ...prev,
          columnId: newValue?.id ?? prev.columnId,
        };
      }
      if (key === 'assigneeUser') {
        const newValue = value as UserComboboxValue | null;
        return {
          ...prev,
          assigneeUser: newValue,
        };
      }
      return prev;
    });
  };

  const isDisabled = useMemo(() => {
    const original = initialValue;

    const hasChanged =
      original.columnId !== formValue.columnId
      || original.imageUrl !== defaultImageUrl
      || original.title !== formValue.title
      || original.description !== formValue.description
      || original.dueDate !== formValue.dueDate
      || original.assigneeUser?.id !== formValue.assigneeUser?.id
      || JSON.stringify(original.tags) !== JSON.stringify(formValue.tags)
      || imageFile !== null;

    return !hasChanged || formValue.title.trim() === '' || formValue.description.trim() === '';
  }, [formValue, initialValue, imageFile, defaultImageUrl]);

  const handleSubmit = async () => {
    try {
      await onSubmit(formValue, imageFile);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : '카드 수정 중 오류가 발생했습니다.';
      setErrorMessage(errorMsg);
    }
  };

  if (!columnList) {
    return null;
  }

  return (
    <FormModal modalName={modalName}>
      <FormModal.Title title='할 일 수정' />
      <FormModal.Form onSubmit={handleSubmit}>
        <FormModal.Body>
          <div className='scrollbar-hidden scrollbar-thin-gray -mr-[10px] flex h-[calc(100dvh-450px)] flex-col gap-[32px] overflow-y-auto sm:mr-0 sm:max-h-[calc(100dvh-380px)]'>
            <div className='flex w-full flex-col gap-[32px] sm:flex-row'>
              <div className='input-group-style w-full'>
                <Label htmlFor='columnId' className='label-style'>
                  상태
                </Label>
                <Combobox
                  id='columnId'
                  value={
                    columnList
                      .map((col) => ({ id: col.id, title: col.title }))
                      .find((col) => col.id === formValue.columnId) ?? null
                  }
                  setValue={(value) => handleComboboxChange('columnId', value)}>
                  <Combobox.Trigger name='컬럼' placeholder='컬럼 선택' />
                  <Combobox.List>
                    {columnList.map((col) => (
                      <Combobox.Item key={col.id} value={{ id: col.id, title: col.title }}>
                        <CardStatusBadge title={col.title} />
                      </Combobox.Item>
                    ))}
                  </Combobox.List>
                </Combobox>
              </div>

              <div className='input-group-style w-full'>
                <Label htmlFor='assigneeUserId' className='label-style'>
                  담당자
                </Label>
                <Combobox
                  id='assigneeUserId'
                  value={formValue.assigneeUser}
                  setValue={(value) => handleComboboxChange('assigneeUser', value)}>
                  <Combobox.Trigger name='담당자' placeholder='이름을 입력해 주세요' />
                  <Combobox.List>
                    {memberData.members.map((m) => (
                      <Combobox.Item key={m.id} value={m}>
                        <Avatar size='s' user={m}>
                          <Avatar.Img />
                          <Avatar.Fallback />
                        </Avatar>
                        <span className='font-medium'>{m.nickname}</span>
                      </Combobox.Item>
                    ))}
                  </Combobox.List>
                </Combobox>
              </div>
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

            <Input
              value={formValue.dueDate === DUE_DATE ? '' : formValue.dueDate}
              onChange={handleChange('dueDate')}>
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
                setTags={(next) => setFormValue((prev) => ({ ...prev, tags: next }))}
              />
            </div>

            <div className='input-group-style'>
              <Label htmlFor='imageUrl' className='label-style'>
                이미지
              </Label>
              <ImageUpload
                edit
                defaultImageUrl={defaultImageUrl === IMAGE_URL ? '' : defaultImageUrl}
                setDefaultImageUrl={setDefaultImageUrl}
                file={imageFile}
                onFileChange={setImageFile}
              />
            </div>
          </div>

          {(serverErrorMessage || errorMessage) && (
            <span className='mt-[12px] inline-block font-md-medium text-error'>
              {serverErrorMessage || errorMessage}
            </span>
          )}
        </FormModal.Body>

        <FormModal.Footer className='pt-[32px]'>
          <Button theme='outlined' onClick={handleModalClose}>
            취소
          </Button>
          <Button disabled={isDisabled} theme='primary' type='submit'>
            수정
          </Button>
        </FormModal.Footer>
      </FormModal.Form>
    </FormModal>
  );
}
