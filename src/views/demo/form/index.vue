<template>
  <PageWrapper title="表单基础示例" contentFullHeight>
    <CollapseContainer title="基础示例">
      <BasicForm
        @register="registerForm"
        autoFocusFirstItem
        :labelWidth="200"
        :schemas="schemas"
        :actionColOptions="{ span: 24 }"
        @submit="handleSubmit"
        @reset="handleReset"
        @field-value-change="onFieldValueChange"
      >
        <template #selectA="{ model, field }">
          <Select :options="optionsA" mode="multiple" v-model:value="model[field]" @change="valueSelectA = model[field]" allowClear />
        </template>
        <template #selectB="{ model, field }">
          <Select :options="optionsB" mode="multiple" v-model:value="model[field]" @change="valueSelectB = model[field]" allowClear />
        </template>
        <template #localSearch="{ model, field }">
          <ApiSelect
            :api="optionsListApi"
            showSearch
            v-model:value="model[field]"
            optionFilterProp="label"
            resultField="list"
            labelField="name"
            valueField="id"
          />
        </template>
        <template #remoteSearch="{ model, field }">
          <ApiSelect
            :api="optionsListApi"
            showSearch
            v-model:value="model[field]"
            :filterOption="false"
            resultField="list"
            labelField="name"
            valueField="id"
            :params="searchParams"
            @search="useDebounceFn(onSearch, 300)"
          />
        </template>
      </BasicForm>
    </CollapseContainer>
  </PageWrapper>
</template>
<script lang="ts" setup>
import { computed, unref, ref, onMounted } from 'vue'
import { BasicForm, useForm, FormSchema, ApiSelect } from '@/components/Form'
import { CollapseContainer } from '@/components/Container'
import { useMessage } from '@/hooks/web/useMessage'
import { PageWrapper } from '@/components/Page'
import dayjs from 'dayjs'
import { optionsListApi } from '@/api/demo/select'
import { useDebounceFn } from '@vueuse/core'
import { treeOptionsListApi } from '@/api/demo/tree'
import { Select } from 'ant-design-vue'
import { cloneDeep } from 'lodash-es'
import { areaRecord } from '@/api/demo/cascader'
import { isArray } from '@/utils/is'
import { uploadApi } from '@/api/sys/upload'

const valueSelectA = ref<string[]>([])
const valueSelectB = ref<string[]>([])
const options = ref<Recordable[]>([])
for (let i = 1; i < 10; i++) options.value.push({ label: '选项' + i, value: `${i}` })

const optionsA = computed(() => {
  return cloneDeep(unref(options)).map((op) => {
    op.disabled = unref(valueSelectB).indexOf(op.value) !== -1
    return op
  })
})
const optionsB = computed(() => {
  return cloneDeep(unref(options)).map((op) => {
    op.disabled = unref(valueSelectA).indexOf(op.value) !== -1
    return op
  })
})

const onFieldValueChange = () => {}

const [registerForm, { getFieldsValue, setFieldsValue }] = useForm({
  fieldMapToTime: [
    ['rangeTime', ['startTime', 'endTime'], 'YYYY-MM-DD HH:mm:ss'],
    ['rangeTime1', ['startDate', 'endDate'], 'YYYY-MM-DD HH:mm:ss']
  ]
})

const provincesOptions = [
  {
    id: 'guangdong',
    label: '广东省',
    value: '1',
    key: '1'
  },
  {
    id: 'jiangsu',
    label: '江苏省',
    value: '2',
    key: '2'
  }
]
const citiesOptionsData = {
  guangdong: [
    {
      label: '珠海市',
      value: '1',
      key: '1'
    },
    {
      label: '深圳市',
      value: '2',
      key: '2'
    },
    {
      label: '广州市',
      value: '3',
      key: '3'
    }
  ],
  jiangsu: [
    {
      label: '南京市',
      value: '1',
      key: '1'
    },
    {
      label: '无锡市',
      value: '2',
      key: '2'
    },
    {
      label: '苏州市',
      value: '3',
      key: '3'
    }
  ]
}

const schemas: FormSchema[] = [
  {
    field: 'divider-basic',
    component: 'Divider',
    label: '基础字段',
    colProps: {
      span: 24
    }
  },
  {
    field: 'field1',
    component: 'Input',
    label: '字段1',

    colProps: {
      span: 8
    },
    // componentProps:{},
    // can func
    componentProps: () => {
      return {
        placeholder: '自定义placeholder',
        onChange: (e: any) => {
          console.log(e)
        }
      }
    },
    renderComponentContent: () => {
      return {
        prefix: () => 'pSlot',
        suffix: () => 'sSlot'
      }
    }
  },
  {
    field: 'field2',
    component: 'Input',
    label: '带后缀',
    defaultValue: '111',
    colProps: {
      span: 8
    },
    componentProps: {
      onChange: (e: any) => {
        console.log(e)
      }
    },
    suffix: '天'
  },
  {
    field: 'fieldsc',
    component: 'Upload',
    label: '上传',
    colProps: {
      span: 8
    },
    rules: [{ required: true, message: '请选择上传文件' }],
    componentProps: {
      api: uploadApi
    }
  },
  {
    field: 'fieldsc1',
    component: 'UploadHead',
    label: '上传图片',
    componentProps: {
      api: uploadApi,
      accept: ['png', 'jpeg', 'jpg'],
      maxSize: 2,
      maxNumber: 1
    },
    rules: [
      {
        required: true,
        trigger: 'change',
        validator(_, value) {
          if (isArray(value) && value.length > 0) {
            return Promise.resolve()
          } else {
            return Promise.reject('请选择上传图片')
          }
        }
      }
    ]
  },
  {
    field: 'fieldsc2',
    component: 'UploadCard',
    label: '照片墙',
    colProps: {
      span: 24
    },
    rules: [
      {
        required: true,
        trigger: 'change',
        validator(_, value) {
          if (isArray(value) && value.length > 0) {
            return Promise.resolve()
          } else {
            return Promise.reject('请选择上传图片')
          }
        }
      }
    ],
    componentProps: {
      api: uploadApi,
      accept: ['png', 'jpeg', 'jpg'],
      maxSize: 2,
      maxNumber: 4
    }
  },
  {
    field: 'field3',
    component: 'DatePicker',
    label: '字段3',
    colProps: {
      span: 8
    }
  },
  {
    field: 'field4',
    component: 'Select',
    label: '字段4',
    colProps: {
      span: 8
    },
    componentProps: {
      options: [
        {
          label: '选项1',
          value: '1',
          key: '1'
        },
        {
          label: '选项2',
          value: '2',
          key: '2'
        }
      ]
    }
  },
  {
    field: 'field5',
    component: 'CheckboxGroup',
    label: '字段5',
    colProps: {
      span: 8
    },
    defaultValue: ['1'],
    componentProps: {
      options: [
        {
          label: '选项1',
          value: '1'
        },
        {
          label: '选项2',
          value: '2'
        }
      ]
    }
  },
  {
    field: 'field7',
    component: 'RadioGroup',
    label: '字段7',
    colProps: {
      span: 8
    },
    componentProps: {
      options: [
        {
          label: '选项1',
          value: '1'
        },
        {
          label: '选项2',
          value: '2'
        }
      ]
    }
  },
  {
    field: 'field8',
    component: 'Checkbox',
    label: '字段8',
    colProps: {
      span: 8
    },
    renderComponentContent: 'Check'
  },
  {
    field: 'field88',
    component: 'AllCheckboxGroup',
    label: '字段88',
    defaultValue: ['Apple'],
    componentProps: {
      options: [
        {
          label: 'Apple',
          value: 'Apple'
        },
        {
          label: 'Pear',
          value: 'Pear'
        },
        {
          label: 'Orange',
          value: 'Orange'
        }
      ],
      onChange: (value) => {
        console.log('AllCheckboxGroup====>:', value)
      }
    },
    colProps: {
      span: 8
    }
  },
  {
    field: 'field9',
    component: 'Switch',
    label: '字段9',
    colProps: {
      span: 8
    }
  },
  {
    field: 'field10',
    component: 'RadioButtonGroup',
    label: '字段10',
    colProps: {
      span: 8
    },
    componentProps: {
      options: [
        {
          label: '选项1',
          value: '1'
        },
        {
          label: '选项2',
          value: '2'
        }
      ],
      onChange: (e: Event) => {
        console.log('RadioButtonGroup====>:', e)
      }
    }
  },
  {
    field: 'field11',
    component: 'Cascader',
    label: '字段11',
    colProps: {
      span: 8
    },
    componentProps: {
      options: [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou',
              children: [
                {
                  value: 'xihu',
                  label: 'West Lake'
                }
              ]
            }
          ]
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          children: [
            {
              value: 'nanjing',
              label: 'Nanjing',
              children: [
                {
                  value: 'zhonghuamen',
                  label: 'Zhong Hua Men'
                }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    field: 'divider-api-select',
    component: 'Divider',
    label: '远程下拉演示',
    colProps: {
      span: 24
    }
  },
  {
    field: 'field30',
    component: 'ApiSelect',
    label: '懒加载远程下拉',
    required: true,
    componentProps: {
      // more details see /src/components/Form/src/components/ApiSelect.vue
      api: optionsListApi,
      params: {
        id: 1
      },

      resultField: 'list',
      // use name as label
      labelField: 'name',
      // use id as value
      valueField: 'id',
      // not request untill to select
      immediate: true,
      onChange: () => {
        // console.log('ApiSelect====>:', e, v)
      },
      // atfer request callback
      onOptionsChange: () => {
        // console.log('get options', options.length, options)
      }
    },
    colProps: {
      span: 8
    },
    defaultValue: '0'
  },
  {
    field: 'field8',
    component: 'ApiCascader',
    label: '联动ApiCascader',
    required: true,
    colProps: {
      span: 8
    },
    componentProps: {
      api: areaRecord,
      apiParamKey: 'parentCode',
      dataField: 'data',
      labelField: 'name',
      valueField: 'code',
      initFetchParams: {
        parentCode: ''
      },
      isLeaf: (record) => {
        return !(record.levelType < 3)
      },
      onChange: (e, ...v) => {
        console.log('ApiCascader====>:', e, v)
      }
    }
  },
  {
    field: 'field31',
    component: 'Input',
    label: '下拉本地搜索',
    helpMessage: ['ApiSelect组件', '远程数据源本地搜索', '只发起一次请求获取所有选项'],
    required: true,
    slot: 'localSearch',
    colProps: {
      span: 8
    },
    defaultValue: '0'
  },
  {
    field: 'field32',
    component: 'Input',
    label: '下拉远程搜索',
    helpMessage: ['ApiSelect组件', '将关键词发送到接口进行远程搜索'],
    required: true,
    slot: 'remoteSearch',
    colProps: {
      span: 8
    },
    defaultValue: '0'
  },
  {
    field: 'field33',
    component: 'ApiTreeSelect',
    label: '远程下拉树',
    helpMessage: ['ApiTreeSelect组件', '使用接口提供的数据生成选项'],
    required: true,
    componentProps: {
      api: treeOptionsListApi,
      resultField: 'list',
      onChange: (e, v) => {
        console.log('ApiTreeSelect====>:', e, v)
      }
    },
    colProps: {
      span: 8
    }
  },
  {
    field: 'field44',
    component: 'ApiTreeSelect',
    label: '远程下拉懒加载树',
    helpMessage: ['ApiTreeSelect异步加载数据', '使用接口提供的数据生成选项'],
    required: true,
    componentProps: {
      api: () => {
        return new Promise((resolve) => {
          resolve([
            {
              title: 'parent ',
              value: '0-0'
            }
          ])
        })
      },
      async: true,
      onChange: (e, v) => {
        console.log('ApiTreeSelect====>:', e, v)
      }
    },
    colProps: {
      span: 8
    }
  },
  {
    field: 'field34',
    component: 'ApiRadioGroup',
    label: '远程Radio',
    helpMessage: ['ApiRadioGroup组件', '使用接口提供的数据生成选项'],
    required: true,
    componentProps: {
      api: optionsListApi,
      params: {
        count: 2
      },
      resultField: 'list',
      // use name as label
      labelField: 'name',
      // use id as value
      valueField: 'id'
    },
    defaultValue: '1',
    colProps: {
      span: 8
    }
  },
  {
    field: 'field35',
    component: 'ApiRadioGroup',
    label: '远程Radio',
    helpMessage: ['ApiRadioGroup组件', '使用接口提供的数据生成选项'],
    required: true,
    componentProps: {
      api: optionsListApi,
      params: {
        count: 2
      },
      resultField: 'list',
      // use name as label
      labelField: 'name',
      // use id as value
      valueField: 'id',
      isBtn: true,
      onChange: (e, v) => {
        console.log('ApiRadioGroup====>:', e, v)
      }
    },
    colProps: {
      span: 8
    }
  },
  // {
  //   field: 'field36',
  //   component: 'ApiTree',
  //   label: '远程Tree',
  //   helpMessage: ['ApiTree组件', '使用接口提供的数据生成选项'],
  //   required: true,
  //   componentProps: {
  //     api: treeOptionsListApi,
  //     params: {
  //       count: 2,
  //     },
  //     afterFetch: (v) => {
  //       //do something
  //       return v;
  //     },
  //     resultField: 'list',
  //   },
  //   colProps: {
  //     span: 8,
  //   },
  // },
  {
    field: 'divider-linked',
    component: 'Divider',
    label: '字段联动',
    colProps: {
      span: 24
    }
  },
  {
    field: 'province',
    component: 'Select',
    label: '省份',
    colProps: {
      span: 8
    },
    componentProps: ({ formModel, formActionType }) => {
      return {
        options: provincesOptions,
        placeholder: '省份与城市联动',
        onChange: (e: any) => {
          // console.log(e)
          let citiesOptions = e == 1 ? citiesOptionsData[provincesOptions[0].id] : citiesOptionsData[provincesOptions[1].id]
          // console.log(citiesOptions)
          if (e === undefined) {
            citiesOptions = []
          }
          formModel.city = undefined //  reset city value
          const { updateSchema } = formActionType
          updateSchema({
            field: 'city',
            componentProps: {
              options: citiesOptions
            }
          })
        }
      }
    }
  },
  {
    field: 'city',
    component: 'Select',
    label: '城市',
    colProps: {
      span: 8
    },
    componentProps: {
      options: [], // defalut []
      placeholder: '省份与城市联动'
    }
  },
  {
    field: 'divider-selects',
    component: 'Divider',
    label: '互斥多选',
    helpMessage: ['两个Select共用数据源', '但不可选择对方已选中的项目'],
    colProps: {
      span: 24
    }
  },
  {
    field: 'selectA',
    component: 'Select',
    label: '互斥SelectA',
    slot: 'selectA',
    defaultValue: [],
    colProps: {
      span: 8
    }
  },
  {
    field: 'selectB',
    component: 'Select',
    label: '互斥SelectB',
    slot: 'selectB',
    defaultValue: [],
    colProps: {
      span: 8
    }
  },
  {
    field: 'custom',
    component: 'CustomDate',
    label: '自定义时间',
    defaultValue: '3天',
    componentProps: ({ formModel }) => {
      return {
        options: [
          {
            label: '近3天',
            value: '3天'
          },
          {
            label: '近7天',
            value: '7天'
          },
          {
            label: '近30天',
            value: '30天'
          }
        ],
        onChange(_, date) {
          console.log(formModel)
          formModel.rangeTime = date
        }
      }
    },
    colProps: {
      span: 24
    }
  },
  {
    field: 'divider-deconstruct',
    component: 'Divider',
    label: '字段解构',
    helpMessage: ['如果组件的值是 array 或者 object', '可以根据 ES6 的解构语法分别取值'],
    colProps: {
      span: 24
    }
  },
  {
    field: 'rangeTime',
    label: '时间范围',
    component: 'RangePicker',
    defaultValue: [dayjs().subtract(1, 'month').format('YYYY-MM-DD HH:mm:ss'), dayjs().format('YYYY-MM-DD HH:mm:ss')],
    componentProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      placeholder: ['开始时间', '结束时间'],
      showTime: {
        defaultValue: [dayjs('00:00:00', 'HH:mm:ss'), dayjs('23:59:59', 'HH:mm:ss')],
        format: 'HH:mm:ss'
      }
    }
  },
  {
    field: 'rangeTime1',
    label: '时间范围',
    component: 'RangePicker',
    defaultValue: [dayjs().subtract(1, 'month').format('YYYY-MM-DD 00:00:00'), dayjs().format('YYYY-MM-DD 23:59:59')],
    componentProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      placeholder: ['开始时间', '结束时间'],
      showTime: {
        defaultValue: [dayjs('00:00:00', 'HH:mm:ss'), dayjs('23:59:59', 'HH:mm:ss')],
        format: 'HH:mm:ss'
      }
    }
  },
  {
    field: 'divider-others',
    component: 'Divider',
    label: '其它',
    colProps: {
      span: 24
    }
  },
  {
    field: 'field20',
    component: 'InputNumber',
    label: '字段20',
    required: true,
    colProps: {
      span: 8
    }
  },
  {
    field: 'field21',
    component: 'Slider',
    label: '字段21',
    componentProps: {
      min: 0,
      max: 100,
      range: true,
      marks: {
        20: '20°C',
        60: '60°C'
      }
    },
    colProps: {
      span: 8
    }
  },
  {
    field: 'field22',
    component: 'Rate',
    label: '字段22',
    defaultValue: 3,
    colProps: {
      span: 8
    },
    componentProps: {
      disabled: false,
      allowHalf: true
    }
  }
]

const { createMessage } = useMessage()
const keyword = ref<string>('')
const searchParams = computed<Recordable>(() => {
  return { keyword: unref(keyword) }
})

function onSearch(value: string) {
  keyword.value = value
}
function handleReset() {
  keyword.value = ''
}
function handleSubmit(values: any) {
  console.log('values', values)
  createMessage.success('click search,values:' + JSON.stringify(values))
}
onMounted(() => {
  console.log(getFieldsValue())
  setFieldsValue({
    fieldsc1: ['https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png']
  })
})
</script>
