import { FormSchema } from '@/components/Table'

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    component: 'InputSearch',
    label: '卡片名称',
    colProps: {
      span: 24
    },
    componentProps: {
      onChange: (e: any) => {
        console.log(e)
      }
    }
  },
  {
    field: 'w',
    label: '宽度',
    component: 'InputNumber',
    defaultValue: 0,
    suffix: 'px',
    colProps: {
      span: 12
    }
  },
  {
    field: 'h',
    label: '高度',
    component: 'InputNumber',
    defaultValue: 0,
    suffix: 'px',
    colProps: {
      span: 12
    }
  },
  {
    field: 'x',
    label: 'x坐标',
    component: 'InputNumber',
    defaultValue: 0,
    suffix: 'px',
    colProps: {
      span: 12
    }
  },
  {
    field: 'y',
    label: 'y坐标',
    component: 'InputNumber',
    defaultValue: 0,
    suffix: 'px',
    colProps: {
      span: 12
    }
  }
]
