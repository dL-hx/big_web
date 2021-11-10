import React, { useState } from "react";
import { Form, Button, Input } from "antd";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useDynamicList } from "ahooks";

export default () => {
  const { list, remove, getKey, push } = useDynamicList(["David", "Jack"]);
  const [form] = Form.useForm();

  const [result, setResult] = useState("");

  const Row = (index: number, item: any) => (
    <div style={{ display: "flex" }} key={getKey(index)}>
      <div>
        <Form.Item
          rules={[{ required: true, message: "required" }]}
          name={["names", getKey(index), "aaa"]}
          initialValue={item}
        >
          <Input style={{ width: 300 }} placeholder="Please enter your name" />
        </Form.Item>
      </div>
      <div style={{ marginTop: 4 }}>
        {list.length > 1 && (
          <MinusCircleOutlined
            style={{ marginLeft: 8 }}
            onClick={() => {
              remove(index);
            }}
          />
        )}
        <PlusCircleOutlined
          style={{ marginLeft: 8 }}
          onClick={() => {
            push("");
          }}
        />
      </div>
    </div>
  );

  return (
    <>
      <Form form={form}>
        {/* 这里不能给name, 否则会变成受控组件, 这样就不可双向同步 */}
        <Form.Item label="基础Input" required>
          {list.map((ele, index) => Row(index, ele))}
        </Form.Item>
      </Form>
      <Button
        style={{ marginTop: 8 }}
        type="primary"
        onClick={() =>
          form
            .validateFields()
            .then((val) => {
              console.log(val);
              console.log(
                // 去除空值操作
                JSON.stringify((val || {}).names.filter((e: string) => !!e))
              );
              setResult(
                JSON.stringify((val || {}).names.filter((e: string) => !!e))
              );
            })
            .catch(() => {})
        }
      >
        Submit
      </Button>
      <div>{result}</div>
    </>
  );
};
