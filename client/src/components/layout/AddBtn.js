const AddBtn = () => {
  return (
    <div className='fixed-action-btn'>
      <a
        href='#add-log-modal'
        className='btn-floating btn-large blue darken-2 modal-trigger'>
        <i className='large material-icons'>post_add</i>
      </a>

      <ul>
        <li>
          <a
            href='#edit-log-modal'
            className='btn-floating black modal-trigger'>
            <i className='material-icons'>edit</i>
          </a>
        </li>
        <li>
          <a
            href='#delete-log-modal'
            className='btn-floating red modal-trigger'>
            <i className='material-icons'>delete_forever</i>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default AddBtn;
