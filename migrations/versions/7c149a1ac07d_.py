"""empty message

Revision ID: 7c149a1ac07d
Revises: 0673d57cda97
Create Date: 2024-06-23 05:40:22.423002

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '7c149a1ac07d'
down_revision = '0673d57cda97'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('invoice', schema=None) as batch_op:
        batch_op.drop_column('total_price')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('invoice', schema=None) as batch_op:
        batch_op.add_column(sa.Column('total_price', postgresql.DOUBLE_PRECISION(precision=53), autoincrement=False, nullable=False))

    # ### end Alembic commands ###