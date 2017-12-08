> 이 포스트는 [Fastcampus 의 리액트 강의](http://www.fastcampus.co.kr/dev_camp_react/) 에서 사용된 강의 자료로서, 설명 중 일부가 생략되어 있을 수 있습니다. 기초가 부족하시다면 좀 오래되긴 했지만 저의 [강의목록](https://velopert.com/reactjs-tutorials) 에서 나오는 3편, 4편, 5편, 7편을 가볍게 읽고오세요 (해당 강의들의 실습은 따라하지 않으셔도 됩니다)

## 0. 시작하기

이번에는 프론트엔드 기초를 다룰때면 흔히 만들게 되는 투두 리스트, 혹은 "할 일 목록" 을 구현해보겠습니다.

![](https://i.imgur.com/uABL8e3.png)

(우리는 앞으로 위와 같은 프로젝트를 만들어가게 됩니다)

### 작업환경 설정

이 튜토리얼을 진행하시려면 다음 환경을 준비하셔야 합니다.
- Node LTS 버전 (현재 v8.9.2) 설치
- yarn
- 그리고 여러분이 가장 좋아하는 에디터 아무거나 (저는 주로 VS Code 를 사용합니다. 그 외에도 Atom, WebStorm 또한 훌륭한 선택입니다.)

### create-react-app 설치 및 사용

리액트 프로젝트를 만들때는, 페이스북에서 만든 리액트 프로젝트 생성 도구인 create-react-app 을 사용합니다. 단순 내가 구현한 기능이 참 많아~ 를 뽐내며 만들어진 수많은 리액트 boilerplate  와는 다르게, 정말 프로젝트에 필요한 기능만 딱 들어있습니다. 

> 참고로, 저는 회사 프로젝트, 사이드 프로젝트 등을 create-react-app 을 사용하여 프로젝트를 생성하고 더 나아가 나중에 커스터마이징 하여 사용했습니다. GitHub 에 돌아다니는 리액트 boilerplate 를 사용하게 된다면.. 특히 초심자라면 대체 무슨 기능이 어떻게 작동하는지도 모른체 사용을 하게 될 겁니다.  필요없는 기능을 빼는데 오히려 시간이 더 들어갈지도 몰라요. 

create-react-app 을 설치하려면 일단 글로벌 설치를 하셔야 합니다.
```bash
yarn global add create-react-app
```

그 다음엔, 다음 명령어를 통하여 프로젝트를 생성 하세요.
```bash
create-react-app todo-list
```

그러면 명령어를 실행 디렉토리에 todo-list 라는 디렉토리가 생깁니다. 코드 에디터를 사용하여 해당 프로젝트 디렉토리를 열으시고, 그리고 todo-list 디렉토리에 들어가서 다음 명령어를 실행하세요.

```bash
yarn start
```

그러면, 다음과 같이 서버가 시작해요.

```

Compiled successfully!

You can now view todo-list in the browser.

  Local:            http://localhost:3000/
  On Your Network:  http://172.30.1.25:3000/

Note that the development build is not optimized.
To create a production build, use yarn build.

```

자 그러면, http://localhost:3000/ 에 들어가보세요. 

![](https://i.imgur.com/1IDbWyW.png)

여러분이 리액트를 공부하게 되면서 앞으로 자주 볼 화면일거예요! 

자 이제 이 화면을 보셨다면, 여러분이 하실 것은 이 화면을 날려버리는 것 입니다. 이걸 기반으로 뭘 만들 일은 없어요.

### 프로젝트 초기화

App.js 를 다음과 같이 변경하세요:

#### `src/App.js`
```javascript
import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div>
        App
      </div>
    );
  }
}

export default App;
```

그리고 App.css, App.test.js, logo.svg 파일도 제거하세요.

이렇게 하고나면, 페이지에 App 이란 텍스트만 띡 하고 나타날겁니다.

## 1. 컴포넌트 구성하기
자, 우리 그럼 컴포넌트를 만들어볼까요? 우리는 컴포넌트를 src/components 디렉토리에 몰아서 만들겠습니다. 실제 프로젝트를 만들게 되는 경우엔, 컴포넌트를 종류별로 분류하여 각각 다른 디렉토리에 만들겠지만, 우리는 몇개 안되니까 하나에 다 몰아서 만들게요!

### 첫번째 컴포넌트, TodoTemplate

컴포넌트를 만들땐, 그냥 검정색 텍스트만 보여지는게 아니라면 스타일링도 해줘야겠죠? 우리는, 각 컴포넌트마다 스타일 css 파일을 만들어주겠습니다. (스타일링도, 방법이 여러종류가 있습니다. [여기](https://velopert.com/3447) 에서 자세히 읽어 보실 수있어요)

components 디렉토리에 다음 파일을 생성하세요:

- src/components/TodoListTemplate.js
- src/components/TodoListTemplate.css

우선 이 컴포넌트의 역할을 미리 말씀드리자면, 이름이 명시하는대로 템플릿의 역할을 합니다. 이 강의의 초반부에 프로젝트 미리보기 이미지에서 보시면 중앙에 흰색 박스가 있고, 타이틀이 보여지고, 그 아래에는 폼과 리스트가 있습니다.

이 템플릿은 하나의 '틀' 이라고 보시면 되겠습니다. 그럼, TodoListTemplate.js 를 다음과 같이 만들어보세요!

#### `src/components/TodoListTemplate.js`
```javascript
import React from 'react';
import './TodoListTemplate.css';

const TodoListTemplate = ({form, children}) => {
  return (
    <main className="todo-list-template">
      <div className="title">
        오늘 할 일
      </div>
      <section className="form-wrapper">
        {form}
      </section>
      <section className="todos-wrapper">
        { children }
      </section>
    </main>
  );
};

export default TodoListTemplate;
```

이 컴포넌트는 [함수형 컴포넌트](https://velopert.com/2994) 입니다. 파라미터로 받게 되는것은 props 인데요, 이를 [비구조화 할당](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) 하여 원래 `(props) => { ... }` 를 해야 하는것을 `({form, children}) => { ... }` 형태로 작성을 했습니다.

이 컴포넌트는 두가지의 props 를 받게 돼요. children 의 경우엔 나중에 우리가 이 컴포넌트를 사용하게 될 때 
```
<TodoListTemplate>여기에 있는 내용!</TodoListTemplate>
```

 이 들어가게 됩니다 (태그의 사이).

여기서 form 은, 우리가 나중에 인풋과 버튼이 들어가있는 컴포넌트를 렌더링 할 때 사용 할 건데요, 이것도 마치 children 을 사용하듯이 JSX 형태로 전달을 해줄겁니다.

```
<TodoListTemplate form={<div>이렇게 말이죠.</div>}>
	<div>여기엔 children 자리구요.</div>
</TodoListTemplate>
```


여러 종류의 JSX 를 컴포넌트의 props 로 넣어주려면 위와 같은 방법은 정말 편합니다. 앞으로도 자주 사용하세요! 전혀 문제가 없으니까요

> **만약에 이런 Template 컴포넌트를 안 쓴다면?**
> 
> 일단, 이런 Template 컴포넌트를 만드는건 리액트에서 필요한 요구사항이 아닙니다. 다만, 제가 개발하면서 편하다고 생각하는 방식이에요. 만약에 이걸 안한다면.. TodoListWrapper 란 컴포넌트를 만들게되어 children 내부에 모든걸 다 넣어주겠죠. 이런식으로 말이에요: `<TodoListWrapper><Form/><TodoList/></TodoListWrapper>` 물론 이런 방식, 전혀 문제되지 않습니다. 
> 
>그런데 예를 들어서 Form 과 TodoList 사이에 테두리를 설정한다고 했을 때 만약에 Template 컴포넌트를 사용하는 경우에 이런 스타일은 Template 내에서 주면 되겠지만, Wrapper 같은 컴포넌트를 사용하게 되면 해당 스타일을 Form 혹은 TodoList 쪽에 넣어주어야겠죠?
>
> 일단 우리가 현재 진행하고 있는 프로젝트는 매우 작은 프로젝트이기 때문에 어떻게 하던 큰 불편함은 없습니다. 만약에 이러한 방식이 맘에 안든다면 여러분이 좋아하는 방식으로 작성을 하시고, 위와 같이 JSX 를 props 로 전달 해 줄 수 있다는 점만 알아두세요! 나중에 언젠가 유용하게 사용하게될겁니다.

자, 그러면 CSS 도 작성해볼까요?

#### `src/components/TodoListTemplate.css`
```css
.todo-list-template {
  background: white;
  width: 512px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23); /* 그림자 */ 
  margin: 0 auto; /* 페이지 중앙 정렬 */
  margin-top: 4rem;
}

.title {
  padding: 2rem;
  font-size: 2.5rem;
  text-align: center;
  font-weight: 100;
  background: #22b8cf;;
  color: white;
}

.form-wrapper {
  padding: 1rem;
  border-bottom: 1px solid #22b8cf;
}

.todos-wrapper {
  min-height: 5rem;
}
```

> 앞으로 색상은 [open-color](https://yeun.github.io/open-color/) 를 참조하겠습니다. 디자인을 하게 될 때, 색상에 자신이 없다면 이 팔레트를 활용하시면 큰 도움이 될겁니다.

> CSS 의 경우엔, 이미 익숙할 거라고 가정하고 자세한 설명은 생략하고 필요한 부분에만 주석을 작성하도록 하겠습니다.

그리고, index.css 파일에서 페이지 배경색을 회색으로 지정하세요.

#### `src/index.css`
```css
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background: #f9f9f9;
}
```


다 작성하셨나요? 그러면 TodoListTemplate 컴포넌트를 한번 App 에서 불러와서 사용해보세요!


#### `src/App.js`
```javascript
import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';

class App extends Component {
  render() {
    return (
      <TodoListTemplate>
        템플릿 완성
      </TodoListTemplate>
    );
  }
}

export default App;
```

![](https://i.imgur.com/iRpynQg.png)

위와 같이 보여진다면 성공!

### 두번째 컴포넌트, Form 만들기

![](https://i.imgur.com/nGZ85u1.png)

이 컴포넌트는 인풋과 버튼이 담겨있는 컴포넌트입니다. 기능을 구현하기 전에, 모양새부터 먼저 갖춰보도록 할게요. 앞으로 리액트 컴포넌트를 구현하게 될 때는, 다음과 같은 흐름으로 개발하게 됩니다.

![](https://i.imgur.com/2K065x6.png)

components 디렉토리에 다음 파일들을 생성하세요:

- src/components/Form.js
- src/components/Form.css

컴포넌트 자바스크립트 파일부터 작성해봅시다.

#### `src/components/Form.js`
```javascript
import React from 'react';
import './Form.css';

const Form = ({value, onChange, onCreate, onKeyPress}) => {
  return (
    <div className="form">
      <input value={value} onChange={onChange} onKeyPress={onKeyPress}/>
      <div className="create-button" onClick={onCreate}>
        추가
      </div>
    </div>
  );
};

export default Form;
```

이 컴포넌트는 총 4가지의 props 를 받아옵니다. 

- value: 인풋의 내용
- onCreate: 버튼이 클릭 될 때 실행 될 함수
- onChange: 인풋 내용이 변경 될 때 실행되는 함수
- onKeyPress: 인풋에서 키를 입력 할 때 실행되는 함수. 이 함수는 나중에 Enter 가 눌렸을 때 onCreate 를 한 것과 동일한 작업을 하기 위해서 사용합니다.

그러면 스타일링도 해봅시다!


#### `src/components/Form.css`
```css
.form {
  display: flex;
}

.form input {
  flex: 1; /* 버튼을 뺀 빈 공간을 모두 채워줍니다 */
  font-size: 1.25rem;
  outline: none;
  border: none;
  border-bottom: 1px solid #c5f6fa;
}

.create-button {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-left: 1rem;
  background: #22b8cf;
  border-radius: 3px;
  color: white;
  font-weight: 600;
  cursor: pointer;
}

.create-button:hover {
  background: #3bc9db;
}
```

여기선 레이아웃을 위하여 flex 가 사용되었습니다. flex 가 익숙하지 않으시다면 이 [게임](http://flexboxfroggy.com/#ko) 을 진행하신다면 아주 큰 도움이 될거예요.

다 만드셨다면 이 컴포넌트를 App 에 렌더링해보세요.

#### `src/App.js`
```javascript
import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';

class App extends Component {
  render() {
    return (
      <TodoListTemplate form={<Form/>}>
        템플릿 완성
      </TodoListTemplate>
    );
  }
}

export default App;
```

![](https://i.imgur.com/Hhz4Ble.png)

이렇게 인풋이 나타났지요? 

### 세번째 컴포넌트, TodoItemList 만들기

이 컴포넌트는 우리가 곧 이어 만들 TodoItem 컴포넌트 여러개를 렌더링해주는 역할을 합니다. 우리가 Template 컴포넌트를 만들었기 때문에 이 컴포넌트에선 따로 스타일링 할 건 없어요.

'리스트' 를 렌더링하게 될 때는, 특히 보여주는 리스트가 동적인 경우에는 함수형이 아닌 클래스형 컴포넌트로 작성하세요. 그 이유는, 클래스형 컴포넌트로 작성해야 나중에 컴포넌트 성능 최적화를 할 수 있기 때문입니다.

> 사실 이렇게 작은 프로젝트에서는 컴포넌트 성능 최적화를 따로 해주지 않아도 매우 빠르게 작동합니다. 하지만, 만약에 리스트 내에서 렌더링하게 될 컴포넌트가 몇백개가 될 수도 있다면 더 나은 유저 경험을 위해선 컴포넌트 최적화는 필수입니다!

#### `src/components/TodoItemList.js`
```javascript
import React, { Component } from 'react';

class TodoItemList extends Component {
  render() {
    const { todos, onToggle, onRemove } = this.props;
    
    return (
      <div>
        
      </div>
    );
  }
}

export default TodoItemList;
```

지금은 이렇게 비어있는 컴포넌트를 만들었습니다. 이 컴포넌트는 3가지의 props 를 받게됩니다. 

- todos: todo 객체들이 들어있는 배열
- onToggle: 체크박스를 키고 끄는 함수
- onRemove: 아이템을 삭제시키는 함수

### 네번째 컴포넌트, TodoItem 컴포넌트 만들기
자, 이번엔 TodoItem 컴포넌트를 만들어봅시다. 

![](https://i.imgur.com/bn2i5v7.png)

이 컴포넌트는, 체크 값이 활성화되어있으면 우측에 체크마크 (✓ `&#x2713;`) 를 보여주고, 

마우스가 위에 있을때는 좌측에 엑스마크 (× `&times;`) 를 보여줍니다. 

이 컴포넌트의 영역이 클릭되면 체크박스가 활성화되며 중간줄이 그어지고, 좌측의 엑스가 클릭되면 삭제됩니다.

다음 파일들을 생성하세요:

- src/components/TodoItem.js
- src/components/TodoItem.css

TodoItem 컴포넌트를 작성해보겠습니다. 이 컴포넌트 또한 추후 진행 할 최적화를 목적으로 클래스형으로 작성하겠습니다.

#### `src/components/TodoItem.js`
```javascript
import React, { Component } from 'react';
import './TodoItem.css';

class TodoItem extends Component {
  render() {
    const { text, checked, id, onToggle, onRemove } = this.props;
    
    return (
      <div className="todo-item" onClick={() => onToggle(id)}>
        <div className="remove" onClick={(e) => {
          e.stopPropagation(); // onToggle 이 실행되지 않도록 함
          onRemove(id)}
        }>&times;</div>
        <div className={`todo-text ${checked && 'checked'}`}>
          <div>{text}</div>
        </div>
        {
          checked && (<div className="check-mark">✓</div>)
        }
      </div>
    );
  }
}

export default TodoItem;
```
이 컴포넌트는 총 5가지의 props 를 전달받게 됩니다.

- text: todo 내용
- checked: 체크박스 상태
- id: todo 의 고유 아이디
- onToggle: 체크박스를 키고 끄는 함수
- onRemove: 아이템을 삭제시키는 함수

해당 컴포넌트의 최상위 DOM 의 클릭 이벤트에는 onToggle 을 넣어주고, &times; 가 있는 부분에선 onRemove 를 넣어주었습니다.

onRemove 를 호출하는곳을 보면 `e.stopPropagation()` 이라는 것이 호출 되지요?

만약에 이 작업을 하지 않으면,  &times; 를 눌렀을 때 onRemove 함수만 실행 되는것이 아니라, 해당 DOM의 부모의 클릭 이벤트에 연결되어있는 onToggle 이 실행되는데, onRemove → onToggle 이렇게 실행이 되면서 코드가 의도치 않게 작동하여 삭제가 제대로 진행되지 않습니다.

`e.stopPropagation()` 은 이벤트의 "확산" 을 멈춰줍니다. 즉, 삭제부분에 들어간 이벤트가 해당 부모의 이벤트까지 전달되지 않도록 해줍니다. 따라서, onToggle 은 실행되지 않고 onRemove 만 실행되죠.

> onToggle과 onRemove 는 id 를 파라미터로 넣으면 해당 id 를 가진 데이터를 업데이트합니다. 파라미터를 넣어줘야 하기 때문에, 이 과정에서 우리는 `onClick={() => onToggle(id)}` 와 같은 형식으로 작성을 했는데요, `onClick={onToggle{id}}` 와 같은 형식으로 하고 싶다면..  **절대 안됩니다!!** 리액트가 초심자가 한번 쯤 할 수 있는 실수입니다. 이렇게 하면 해당 함수가 렌더링 될 때 호출이 됩니다. 해당 함수가 호출되면 데이터가 변경 될 것이고, 데이터가 변경되면 또 리렌더링이 되겠죠? 그러면 또 이 함수가 호출되고.. 무한 반복입니다. 

`todo-text` 쪽을 보시면, checked 값에 따라 className 에 `checked` 라는 문자열을 넣어주웠습니다. CSS 클래스를 유동적으로 설정하고 싶다면 이렇게 [템플릿 리터럴](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Template_literals) 을 사용하시면 됩니다.

```javascript
`todo-text ${checked && 'checked'}`
// 아래와 동일합니다.
"todo-text " + checked && 'checked'
```

위와같이 하면 편리하긴 하지만, checked 값이 false 일 때는 todo-text false 와 같은 결과값이 나타납니다. 큰 의미는 없지만 이 부분까지 고쳐준다면 이렇게 작성해야합니다.

```
`todo-text ${ checked ? ' checked' : '' }`
```

> 동적인 클래스를 적용 할 때는, 위와같이 문자열을 상황에 따라 변조하면 됩니다. 그런데 좀 불편하죠? [classnames](https://github.com/JedWatson/classnames) 를 사용하시게 된다면 훨씬 쉽게 할 수 있습니다. 예: `classnames('todo-text', { checked })` 
> 이 라이브러리는 나중에 다뤄보게 되지만 미리 보고 싶다면 [여기](https://velopert.com/3447) 의 classnames 예제를 확인하세요.

컴포넌트 설명이 꽤 길었죠? 이제 스타일링을 해봅시다!

#### `src/components/TodoItem.css`
```css
.todo-item {
  padding: 1rem;
  display: flex;
  align-items: center; /* 세로 가운데 정렬 */
  cursor: pointer;
  transition: all 0.15s;
  user-select: none;
}

.todo-item:hover {
  background: #e3fafc;
}

/* todo-item 에 마우스가 있을때만 .remove 보이기 */
.todo-item:hover .remove {
  opacity: 1;
}

/* todo-item 사이에 윗 테두리 */
.todo-item + .todo-item {
  border-top: 1px solid #f1f3f5;
}


.remove {
  margin-right: 1rem;
  color: #e64980;
  font-weight: 600;
  opacity: 0;
}

.todo-text {
  flex: 1; /* 체크, 엑스를 제외한 공간 다 채우기 */
  word-break: break-all;
}

.checked {
  text-decoration: line-through;
  color: #adb5bd;
}

.check-mark {
  font-size: 1.5rem;
  line-height: 1rem;
  margin-left: 1rem;
  color: #3bc9db;
  font-weight: 800;
}
```

자 그럼 이제 해당 컴포넌트를 TodoItemList 에서 불러와서 실험삼아 3개정도 렌더링을 해보세요.

#### `src/components/TodoItemList.js`
```javascript
import React, { Component } from 'react';
import TodoItem from './TodoItem';

class TodoItemList extends Component {
  render() {
    const { todos, onToggle, onRemove } = this.props;
    
    return (
      <div>
        <TodoItem text="안녕"/>
        <TodoItem text="리액트"/>
        <TodoItem text="반가워"/>        
      </div>
    );
  }
}

export default TodoItemList;
```

그 다음엔 TodoItemList 를 App 에서 불러온다음에 렌더링하세요.

#### `src/App.js`
```javascript
import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';


class App extends Component {
  render() {
    return (
      <TodoListTemplate form={<Form/>}>
        <TodoItemList/>
      </TodoListTemplate>
    );
  }
}

export default App;
```

여기까지 하고나면 다음과 같이 전체적인 틀이 보여질것입니다.

![](https://i.imgur.com/U5FmpTj.png)

## 2. 상태관리 하기

### 상태관리는 어떻게 해야 할까?

우리 프로젝트에서 상태가 필요한 컴포넌트는 Form 과 TodoItemList 입니다. 리액트에 익숙하지 않다면, 리액트의 state 를 각 컴포넌트에 넣어주어야 하는것이 아닌가? 라고 생각이 들 수도 있습니다.

다음과 같이 말이죠: 

![](https://i.imgur.com/ckmex6Y.png)

다른 컴포넌트끼리 직접 데이터를 전달하는것은 [ref](https://velopert.com/1148) 를 사용하여 할 수야 있겠지만 정말 비효율적인 방법입니다. 막 이리저리 꼬이거든요. 이런식으로 개발하고 컴포넌트 많아지면 진짜 유지보수하기 힘들어집니다. (리액트에선 이런건 일종의 안티패턴입니다)

그 대신에, 컴포넌트들은 부모를 통하여 대화를 해야합니다:

![](https://i.imgur.com/nnYKPBo.png)

우리의 경우엔 App 이 Form 과 TodoItemList 의 부모 컴포넌트이니, 해당 컴포넌트에 input, todos 상태를 넣어주고 해당 값들과 값들을 업데이트 하는 함수들을 각각 컴포넌트에 props 로 전달해주어서 기능을 구현하게됩니다.

리액트에서 자주 사용하는 구조중에선, 컴포넌트를 만들 때 프리젠테이셔널 컴포넌트와 컨테이너 컴포넌트로 구분하는 방식이 있습니다. 이에 대해선 나중에 자세히 알아보게 될 것인데요, ([리덕스 정복하기](https://velopert.com/3346) 의 1-2 확인) 미리 소개를 드리자면 오직 뷰만을 담당하는 컴포넌트와, 상태 관리를 담당하는 컴포넌트를 분리하는것을 의미합니다. 

### 초기 state 정의하기

먼저, 초기 state 를 정의해주겠습니다.

#### `src/App.js`
```javascript
import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';


class App extends Component {

  id = 3 // 이미 0,1,2 가 존재하므로 3으로 설정

  state = {
    input: '',
    todos: [
      { id: 0, text: ' 리액트 소개', checked: false },
      { id: 1, text: ' 리액트 소개', checked: true }
      { id: 2, text: ' 리액트 소개', checked: false }
    ]
  }

  render() {
    return (
      <TodoListTemplate form={<Form/>}>
        <TodoItemList/>
      </TodoListTemplate>
    );
  }
}

export default App;
```

초기 state 에는 input 의 값과, todos 배열의 기본 아이템 3개를 넣어주었습니다. todo 객체들을 구분하기 위하여 우리는 id 값을 지정해줄건데요, 데이터가 추가 될 때마다 this.id 값이 1씩 올라가도록 설정하겠습니다.

### Form 기능 구현하기

우선 Form 컴포넌트에서 필요한 기능들이 뭔지 알아봅시다.

1. 텍스트 내용 바뀌면 state 업데이트
2. 버튼이 클릭되면 새로운 todo 생성 후 todos 업데이트
3. 인풋에서 Enter 누르면 버튼을 클릭한것과 동일한 작업진행하기

위 기능들을 구현하기 위해선 컴포넌트에 메소드들을 만들어주어야 합니다.

App 컴포넌트에 handleChange, handleCreate,  handleKeyPress 메소드를 구현하고, 이를 상태의 input 값과 함께 Form 컴포넌트로 전달하세요.

#### `src/App.js`
```javascript
import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';


class App extends Component {

  id = 3 // 이미 0,1,2 가 존재하므로 3으로 설정

  state = {
    input: '',
    todos: [
      { id: 0, text: ' 리액트 소개', checked: false },
      { id: 1, text: ' 리액트 소개', checked: true },
      { id: 2, text: ' 리액트 소개', checked: false }
    ]
  }

  handleChange = (e) => {
    this.setState({
      input: e.target.value // input 의 다음 바뀔 값
    });
  }

  handleCreate = () => {
    const { input, todos } = this.state;
    this.setState({
      input: '', // 인풋 비우고
      // concat 을 사용하여 배열에 추가
      todos: todos.concat({
        id: this.id++,
        text: input,
        checked: false
      })
    });
  }

  handleKeyPress = (e) => {
    // 눌려진 키가 Enter 면 handleCreate 호출
    if(e.key === 'Enter') {
      this.handleCreate();
    }
  }

  render() {
    const { input } = this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress
    } = this;

    return (
      <TodoListTemplate form={(
        <Form 
          value={input}
          onKeyPress={handleKeyPress}
          onChange={handleChange}
          onCreate={handleCreate}
        />
      )}>
        <TodoItemList/>
      </TodoListTemplate>
    );
  }
}

export default App;
```

handleCreate 를 보시면 concat 을 사용하여 배열안에 데이터를 추가했습니다. 자바스크립트로 보통 배열안에 새 데이터를 집어넣을땐 주로 push 를 사용하죠?

```javascript
const array = [];
array.push(1);
// [1]
```

그런데! 리액트 state 에서 배열을 다룰 때는 **절대로** push 를 사용하면 안됩니다. 

그 이유는, 다음과 같아요:

```javascript
let arrayOne = [];
let arrayTwo = arrayOne;
arrayOne.push(1);
console.log(arrayOne === arrayTwo); // true
```

push 를 통하여 데이터를 추가하면 배열에 값이 추가되긴 하지만 가르키고 있는 배열은 똑같기 때문에 비교를 할 수 없습니다. 나중에 최적화를 하게 될 때, 배열을 비교하여 리렌더링을 방지를 하게 되는데요, 만약에 push 를 사용한다면 최적화를 할 수 없게 됩니다.

반면, concat 의 경우엔 새 배열을 만들기 때문에 괜찮습니다.

```javascript
let arrayOne = [];
let arrayTwo = arrayOne.concat(1);
console.log(arrayOne === arrayTwo); // false
```

다음, render 쪽에서 메소드들을 전달해주는 부분을 보시면

```javascript
    const {
      handleChange,
      handleCreate,
      handleKeyPress
    } = this;
```

이렇게 비구조화 할당을 했습니다. 이렇게 함으로서, this.handleChange, this.handleCreate, this.handleKeyPress 이런식으로 계속 this 를 붙여줘야하는 작업을 생략 할 수 있습니다. 이 작업은 만약에 원치 않으시면 생략하고 this 를 직접 붙여주어도 무방합니다.

코드를 다 작성하셨다면 인풋 값을 입력해본다음에 Enter 를 누르거나 버튼을 눌러보세요.

제대로 작성을 하셨다면, 등록이 될 때 인풋 값이 비워질 것입니다.

> **리액트 개발자 도구**
> 우리는 현재 변경된 todos 를 화면에 보여주고 있지는 않기 때문에 육안으로 확인 할 순 없고 제대로 작동 한다는것을 감으로만 알 수 있습니다. 하지만, 실제로 구현하기 전에도 상태가 제대로 바뀌었는지 알 수 있다면 좋지 않을까요?
> [리액트 개발자 도구](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) 를 이용하시면 컴포넌트의 state 는 물론 프로젝트의 컴포넌트 정보들을 모두 편하게 열람 할 수 있습니다.
> ![](https://i.imgur.com/co0IYsI.png)

### TodoItemList 에서 배열을 TodoItem 컴포넌트 배열로 변환하기

todos 안에 있는 객체들을 화면에 보여주기 위해선, todos 배열을 컴포넌트 배열로 변환해주어야 합니다. 배열을 변환 할 때는 자바스크립트 배열의 내장함수 map 을 사용합니다.

#### `map 예제`
```javascript
// 배열안의 원소를 모두 제곱하기
const numbers = [1,2,3,4,5];
const squared = numbers.map(number => number * number);
console.log(numbers); // [1,4,9,16,25]
```

우선,  TodoItemList 에 todos 를 전달하세요.

#### `src/App.js` - render 함수
```javascript
  render() {
    const { input, todos } = this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress
    } = this;

    return (
      <TodoListTemplate form={(
        <Form 
          value={input}
          onKeyPress={handleKeyPress}
          onChange={handleChange}
          onCreate={handleCreate}
        />
      )}>
        <TodoItemList todos={todos}/>
      </TodoListTemplate>
    );
  }
```

그 다음엔, TodoItemList 를 열어서 객체배열을 컴포넌트 배열로 변환해보세요:

#### `src/components/TodoItemList.js`
```javascript
import React, { Component } from 'react';
import TodoItem from './TodoItem';

class TodoItemList extends Component {
  render() {
    const { todos, onToggle, onRemove } = this.props;
    
    const todoList = todos.map(
      ({id, text, checked}) => (
        <TodoItem
          id={id}
          text={text}
          checked={checked}
          onToggle={onToggle}
          onRemove={onRemove}
          key={id}
        />
      )
    );

    return (
      <div>
        {todoList}    
      </div>
    );
  }
}

export default TodoItemList;
```

이 과정에서, 원래는 `const todoList = todos.map(todo => ...)` 의 형태여야 하지만, 함수의 파라미터 부분에서 비구조화 할당을 하여 객체 내부의 값들을 따로 레퍼런스를 만들어주었습니다. 

배열을 렌더링 할 때에는 key 값이 꼭 있어야해요. (없는 경우엔 map 함수의 두번째 파라미터는 index 인데, 그것을 사용하시면 됩니다. index 를 key 를 사용하는것은 정말 필요한 상황이 아니라면 권장하지 않습니다) key 값이 있어야만, 컴포넌트가 리렌더링 될 때 [더욱 효율적으로 작동 할 수 있습니다](https://reactjs.org/docs/reconciliation.html).


> **객체의 값을 모두 props 로 전달하기**
> 혹은, 이런식으로도 할 수 있답니다.
> ```
>     const todoList = todos.map(
      (todo) => (
        <TodoItem
          {...todo}
          onToggle={onToggle}
          onRemove={onRemove}
          key={todo.id}
        />
      )
    );
> ```
> 이렇게 {...todo} 라고 넣어주면, 내부의 값들이 모두 자동으로 props 로 설정이됩니다.

자 이제 페이지를 띄워서 우리가 추가하는 todo 들이 잘 보여지나 확인해보세요.

![](https://i.imgur.com/rtb43Zy.png)

잘 보여졌나요? 아직 상태변경 로직은 준비하지 않았기에 클릭시 오류가 발생할겁니다.

### 체크 하기/체크 풀기
체크를 하거나 푸는 함수를 만들어봅시다.

#### `src/App.js`
```javascript
import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';


class App extends Component {

  (...)

  handleToggle = (id) => {
    const { todos } = this.state;
    
    // 파라미터로 받은 id 를 가지고 몇번째 아이템인지 찾습니다.
    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index]; // 선택한 객체

    const nextTodos = [...todos]; // 배열을 복사
    
    // 기존의 값들을 복사하고, checked 값을 덮어쓰기
    nextTodos[index] = { 
      ...selected, 
      checked: !selected.checked
    };

    this.setState({
      todos: nextTodos
    });
  }

  render() {
    const { input, todos } = this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleToggle
    } = this;

    return (
      <TodoListTemplate form={(
        <Form 
          value={input}
          onKeyPress={handleKeyPress}
          onChange={handleChange}
          onCreate={handleCreate}
        />
      )}>
        <TodoItemList todos={todos} onToggle={handleToggle}/>
      </TodoListTemplate>
    );
  }
}

export default App;
```

배열을 업데이트 할 때도 마찬가지로, 배열의 값을 직접 수정하면 **절대** 안됩니다. push 를 사용하면 안되는것과 같은 이유인데요:

```javascript
let array = [ { value: 1 }, { value: 2 } ];
let nextArray = array;
nextArray[0].value = 10;
console.log(array === nextArray) // true
```

때문에, [전개 연산자](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Spread_operator) 를 통하여 업데이트 해야 할 배열 혹은 객체의 내용을 복사해주어야 합니다.

> 객체들이 들어있는 배열들을 업데이트 할 때마다 복사한다면 오버헤드가 발생하지 않을까? 라는 의문이 들 수도 있습니다. 하지만 걱정하지 않으셔도 됩니다. 전개연산자를 통하여 배열을 복사하는것은 deepCopy 가 아닌 shallowClone 이기 때문에, 내부의 객체 안에있는 내용들은 기존의 것들을 재사용합니다.  즉 n개의 원소가 들어있다면 O(n) 정도의 복잡도라는 것이죠. 따라서, 내부의 객체를 바꿔야 할 때는 바꿀 객체를 새로 지정하고 내부의 값을 복사해줘야합니다.

위 handleToggle 함수는 다음과 같이 구현 될 수도 있습니다:

```javascript
  handleToggle = (id) => {
    const { todos } = this.state;
    const index = todos.findIndex(todo => todo.id === id);
    
    const selected = todos[index];

    this.setState({
      todos: [
        ...todos.slice(0, index),
        {
          ...selected,
          checked: !selected.checked
        },
        ...todos.slice(index + 1, todos.length)
      ]
    });
  }
```

여기까지 작성하셨으면, 리스트에 있는 아이템을 클릭해보세요. 체크가 되나요? 풀리는지도 시도해보세요.

### 아이템 제거하기
아이템 제거하는것은, handleToggle 에 비하면 매우 간단합니다.

#### `src/App.js`
```javascript
import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';


class App extends Component {
  (...)

  handleRemove = (id) => {
    const { todos } = this.state;
    this.setState({
      todos: todos.filter(todo => todo.id !== id)
    });
  }

  render() {
    const { input, todos } = this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleToggle,
      handleRemove
    } = this;

    return (
      <TodoListTemplate form={(
        <Form 
          value={input}
          onKeyPress={handleKeyPress}
          onChange={handleChange}
          onCreate={handleCreate}
        />
      )}>
        <TodoItemList todos={todos} onToggle={handleToggle} onRemove={handleRemove}/>
      </TodoListTemplate>
    );
  }
}

export default App;

```

handleRemove 에서는 자바스크립트 배열의 내장함수인 filter 를 사용했습니다. 즉, 파라미터로 받아온 id 를 갖고있지 않는 배열을 새로 생성해낸것이죠. 이를 통하여 우리가 지정한 id 를 배제한 배열이 재탄생합니다.

그럼, 이걸 todos 로 설정해주면, 원하는 데이터가 사라지겠죠.

> 참 쉽죠?

이제 프로젝트의 모든 기능을 완성하셨습니다!

## 3. 컴포넌트 최적화
자 이제 컴포넌트 최적화를 알아보겠습니다. 일단 애초에 이 프로젝트는 매우 간단하니까 최적화를 할 필요는 없습니다만, 공부를 위해서 한번 해보겠습니다.

자, 우리가 보기에는 현재 리액트 컴포넌트들이 빠릿빠릿하게 렌더링이 되고 있는데, 사실 자원이 낭비되고 있는 부분이 존재합니다.

한번 TodoItem 컴포넌트의 render 함수를 다음과 같이 수정해보세요.

#### `src/components/TodoItem.js`
```javascript
class TodoItem extends Component {
  render() {
    const { text, checked, id, onToggle, onRemove } = this.props;
    
    console.log(id);
```

이렇게 console.log(id) 를 해놓고 나서, 개발자 도구의 콘솔을 열고 인풋 값을 수정해보세요.

![](https://i.imgur.com/gCLnBp7.png)

저런 값을 입력할 때 마다 render 함수가 실행되고 있군요!

일단, 크게 걱정하지는 않으셔도 되는게, render 함수가 실행된다고 해서 DOM에 변화가 일어나는건 아니에요. 리액트에선 가상DOM 을 사용하기 때문에 변화가 없는 곳은 그대로 두겠죠.

다만, 그 대신에 가상DOM 에 렌더링하는 자원이 현재 미세하게 낭비가 되고 있는 셈입니다.

만약에 업데이트가 불필요하다면, render 를 아예 실행하지 않게 하는 것이, 프로젝트의 성능 최적화에 도움이 됩니다. 현재 우리처럼 이렇게 3~4개만 있는 리스트는 전혀 상관 없습니다. 하지만 갯수가 무수히 많아질 수 있다면 최적화를 꼭 해줘야 나중에 보여주는 데이터가 많아져도 버퍼링이 걸리지 않습니다. 특히, 아이템 내부에 보여지는 컴포넌트들이 여러개라면 더더욱 최적화를 해줘야합니다. 

### TodoItemList 최적화

이 컴포넌트를 최적화하는건 정말로 쉽습니다. 

#### `src/components/TodoItemList.js`
```javascript
import React, { Component } from 'react';
import TodoItem from './TodoItem';

class TodoItemList extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.todos !== nextProps.todos;
  }
  
  render() {
    const { todos, onToggle, onRemove } = this.props;
    
    const todoList = todos.map(
      ({id, text, checked}) => (
        <TodoItem
          id={id}
          text={text}
          checked={checked}
          onToggle={onToggle}
          onRemove={onRemove}
          key={id}
        />
      )
    );

    return (
      <div>
        {todoList}    
      </div>
    );
  }
}

export default TodoItemList;
```

[컴포넌트 라이프 사이클 메소드](https://velopert.com/1130)중 shouldComponentUpdate 는 컴포넌트가 리렌더링을 할 지 말지 정해줍니다. 이게 따로 구현되지 않으면 언제나 true 를 반환하는데요, 이를 구현하는 경우에는 업데이트에 영향을 끼치는 조건을 return 해주시면 됩니다.

우리의 경우에는 todos 값이 바뀔 때 리렌더링 하면 되니까 this.props.todos 와 nextProps.todos 를 비교해서 이 값이 다를때만 리렌더링하게 설정하면 끝나요!

컴포넌트를 저장하고 다시 텍스트를 입력해보세요. 컴포넌트가 가장 처음 렌더링 할 때만 id 가 프린트 되지요?

### TodoItem 컴포넌트 최적화
아직 다 끝난게 아닙니다. 한번 첫번째 아이템의 체크를 껐다 켜보거나, 새 todo 를 입력해보세요. 삭제도 해보세요! 하나의 TodoItem 컴포넌트만 업데이트하면 되는건데 또 모든 컴포넌트가 렌더링되고 있습니다.

이 컴포넌트 또한 최적화가 매우 간단합니다.

이 컴포넌트가 업데이트 되는 경우는 checked 값이 바뀔 때 이겠죠? 그럼 shouldComponentUpdate 를 구현해보세요.

#### `src/components/TodoItem.js`
```javascript
import React, { Component } from 'react';
import './TodoItem.css';

class TodoItem extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.checked !== nextProps.checked;
  }
  
  render() {
    (...)
  }
}

export default TodoItem;
```

코드를 저장하고 프로젝트를 조작해보세요. 이제 컴포넌트가 필요할때만 리렌더링이 되고있죠? 삭제를 할 땐 리렌더링되는 Item 이 없습니다.

자, 컴포넌트 최적화도 끝났고.. 우리 프로젝트는 완성되었습니다!

## 숙제

[완성 프로젝트](https://fc3-basic.surge.sh/) 폼 상단에 있는 팔레트 기능을 사용해보고 직접 구현해보세요

1. Palette 컴포넌트를 만드세요
2. TodoListTemplate 에서 Palette 가 들어갈 자리를 만드세요
3. 색상 `['#343a40', '#f03e3e', '#12b886', '#228ae6']` 를 Palette 컴포넌트의 props 로 전달하고, 이를 컴포넌트 배열로 변환하세요.
4. App 의 state 에 color 값을 추가하세요
5. color 를 변경하는 메소드를 만드세요
6. 필요한 props 를 Palette 에 전달하세요.
7. handleCreate 에서 새 Todo 를 만들 때 color 값을 집어넣도록 설정하세요
8. Form 의 input 텍스트가 현재 선택된 색으로 보여지게 하세요
9. TodoItem 이 렌더링 될 때 텍스트를 주어진 색으로 보여지게 하세요


### 힌트
이 부분은 무조건 참고 할 필요는 없습니다. 여러분이 떠오르는 방식으로 구현을 해보세요~

- 동적인 스타일을 줄 때는, `style={}` 을 사용하면 됩니다. 예: `<div style={{ background: color }}/>` 객체를 전달하는 것이기 때문에 {{ }} 로 해주어야 해요.
- 한 컴포넌트 파일에는 두개의 컴포넌트를 선언 할 수도 있습니다. 
```javascript
const Color = ({ color, active, onClick }) => {
  /* 구현 */
}

const Palette = ({colors, selected, onSelect}) => {
  /* 구현 */
};

export default Palette;
```


#### CSS 힌트
#### `src/components/Palette.css`
```css
.palette {
  display: flex;
  justify-content: center;
}

.color {
  width: 2rem;
  height: 2rem;
  opacity: 0.5;
  transition: all 0.2s;
  cursor: pointer;
}

.color:hover {
  opacity: 0.75;
}

.color.active, .color:active {
  opacity: 1;
}

.color + .color {
  margin-left: 1rem;
}
```

### 해설

한번 해보시고 도저히!!! 모르겠다. 그런 경우엔 GitHub 의 레포지토리를 확인하세요. 추가적으로, 자신이 작성한 코드에 피드백을 받고싶다면 src 디렉토리를 압축해서 저에게 DM 으로 보내주세요. 