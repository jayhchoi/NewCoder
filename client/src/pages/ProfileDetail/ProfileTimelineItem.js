import React from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import styled from 'styled-components'

const ProfileTimelineItem = ({ post, from }) => {
  return (
    <div>
      <div className="card mb-3">
        <div className="card-body p-3">
          <div className="d-flex justify-content-between align-items-top">
            <div className="py-1 px-3 text-truncate">{post.text}</div>
            <div className="text-right">
              <div className="text-muted">
                <Moment format="YYYY/MM/DD">{post.created}</Moment>
              </div>
              <div className="badge badge-primary">#{post.tag}</div>
            </div>
          </div>
        </div>
        {post.comments.length > 0 ? (
          <div className="card-footer">
            {post.comments.map(comment => {
              return (
                <CommentBox>
                  <img
                    className="rounded-circle float-left"
                    style={{
                      height: '32px',
                      width: '32px',
                      display: 'inline-block'
                    }}
                    src={comment.user.avatar}
                    alt=""
                  />
                  <CommentText>
                    <strong>{comment.user.name}</strong>{' '}
                    <span className="ml-2">{comment.text}</span>
                  </CommentText>
                </CommentBox>
              )
            })}
          </div>
        ) : null}
      </div>
    </div>
  )
}

const CommentBox = styled.div`
  margin-bottom: 5px;
  display: flex;
  align-items: top;
  height: 32px;
`

const CommentText = styled.div`
  border: 1px solid lightgrey;
  border-radius: 5px;
  display: inline-block;
  padding: 10px;
  margin-left: 10px;
  height: 100%;
  width: 100%;
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export default ProfileTimelineItem
