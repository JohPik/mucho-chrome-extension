import React, { useEffect } from 'react';
import edit from '../../img/edit.svg';
import editLight from '../../img/edit-light.svg';
import plus from '../../img/plus.svg';
import plusLight from '../../img/plus-light.svg';
import Bookmark from './Bookmark';

export default function Bookmarks({
  modal,
  tabIdx,
  setTabIdx,
  tabsState,
  deleteBookmark,
  currentTab,
  setCurrentTab,
  isDarkModeOff,
}) {
  const manageTabChange = (tab, idx) => {
    setCurrentTab(tab);
    setTabIdx(idx);
  };

  useEffect(() => {
    setCurrentTab(tabsState[tabIdx]);
  }, [tabsState, tabIdx, setCurrentTab]);

  return (
    <div className='bookmarks'>
      {tabsState.length === 0 ? (
        <div className='bookmarks__navigation__no_tab'>
          <button onClick={() => modal('createTab')}>
            Add a new bookmark tab
          </button>
        </div>
      ) : (
        <div className='bookmarks__navigation'>
          <ul>
            {tabsState.map((tab, idx) => (
              <li key={idx} className={idx === tabIdx ? 'active' : null}>
                <button onClick={() => manageTabChange(tab, idx)}>
                  {tab.name.length > 13
                    ? tab.name.slice(0, 10) + '...'
                    : tab.name}
                </button>
                <button
                  className='bookmarks__edit-button'
                  onClick={() => modal('editTab', idx)}
                >
                  <img
                    src={isDarkModeOff ? editLight : edit}
                    alt='edit bookmark'
                  />
                </button>
              </li>
            ))}
            {tabsState.length < 5 && (
              <li>
                <button onClick={() => modal('createTab')}>
                  <img
                    src={isDarkModeOff ? plusLight : plus}
                    alt='add bookmark Tab'
                  />
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
      {currentTab && (
        <div className='bookmarks__links'>
          {currentTab.links.map((link, idx) => {
            return (
              <Bookmark
                key={idx}
                linkName={link.linkName}
                url={link.url}
                favicon={link.img.faviconURL}
                shortcutIdx={idx}
                tabIdx={tabIdx}
                deleteBookmark={deleteBookmark}
                isDarkModeOff={isDarkModeOff}
              />
            );
          })}

          {currentTab.links.length < 10 && (
            <div className='bookmark add__new'>
              <button onClick={() => modal('createShortcut')}>
                <img
                  src={isDarkModeOff ? plusLight : plus}
                  alt='add bookmark'
                />
                <p>add new</p>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
